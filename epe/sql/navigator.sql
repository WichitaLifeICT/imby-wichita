-- ============================================================
-- Wichita EPE — NAVIGATOR ROLE & CONNECTIONS
-- Run once in Supabase → SQL Editor, AFTER schema.sql. Safe to re-run.
--
-- Model:
--   * profiles.role in ('member','navigator','partner','admin')
--   * A member is CONNECTED to a navigator via members.navigator_id
--     (= that navigator's profiles.id / auth uid).
--   * Main admin (is_staff()) sees everything.
--   * A navigator sees ONLY members whose navigator_id = their own id.
--   * A member sees only their own row (unchanged).
--
-- SECURITY NOTE: these RLS policies are what keep a navigator scoped to
-- their own caseload. Do NOT skip the "verify" checklist at the bottom.
-- ============================================================

-- 0) Connection column: which navigator a member is assigned to
alter table public.members
  add column if not exists navigator_id uuid references public.profiles(id);
create index if not exists members_navigator_id_idx on public.members(navigator_id);

-- 1) Helper: is the current user the navigator of member `m`?
--    security definer so it can read members regardless of the caller's RLS.
create or replace function public.is_navigator_of(m uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.members mm
    where mm.profile_id = m and mm.navigator_id = auth.uid()
  );
$$;
revoke all on function public.is_navigator_of(uuid) from public;
grant execute on function public.is_navigator_of(uuid) to authenticated;

-- 2) profiles: staff manage everyone; a navigator may read their members'
--    profile rows; everyone may read their own.
--    (Assumes profiles already has RLS enabled and is_staff() exists.)
alter table public.profiles enable row level security;
drop policy if exists prof_self_read on public.profiles;
create policy prof_self_read on public.profiles for select
  using (id = auth.uid() or is_staff() or public.is_navigator_of(id));
drop policy if exists prof_self_upd on public.profiles;
create policy prof_self_upd on public.profiles for update
  using (id = auth.uid() or is_staff());   -- staff can promote a user to 'navigator'

-- 3) members: navigator may read (not edit) their assigned members
drop policy if exists mem_nav_read on public.members;
create policy mem_nav_read on public.members for select
  using (profile_id = auth.uid() or is_staff() or public.is_navigator_of(profile_id));
-- staff may set/clear the navigator_id connection
drop policy if exists mem_staff_upd on public.members;
create policy mem_staff_upd on public.members for update
  using (profile_id = auth.uid() or is_staff());

-- 4) Results tables: let a navigator read their members' data.
--    These ADD to the existing "member or staff" read policies.
drop policy if exists ea_nav_read on public.essential_assessments;
create policy ea_nav_read on public.essential_assessments for select using (public.is_navigator_of(member_id));

drop policy if exists pa_nav_read on public.path_assessments;
create policy pa_nav_read on public.path_assessments for select using (public.is_navigator_of(member_id));

drop policy if exists ms_nav_read on public.milestones;
create policy ms_nav_read on public.milestones for select using (public.is_navigator_of(member_id));
-- navigators (like staff) may verify their members' milestones
drop policy if exists ms_nav_upd on public.milestones;
create policy ms_nav_upd on public.milestones for update using (public.is_navigator_of(member_id));

drop policy if exists rv_nav_read on public.reviews;
create policy rv_nav_read on public.reviews for select using (public.is_navigator_of(member_id));

drop policy if exists st_nav_read on public.stories;
create policy st_nav_read on public.stories for select using (public.is_navigator_of(member_id));

-- 5) MESSAGES — member <-> navigator <-> admin thread.
--    Create the table if it doesn't already exist, then (re)apply policies.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.profiles(id) on delete cascade,   -- the member the thread is about
  sender text not null default 'member',                              -- 'member' | 'navigator' | 'staff'
  body text not null,
  created_at timestamptz default now()
);
alter table public.messages enable row level security;

-- read: the member themself, staff, or that member's navigator
drop policy if exists msg_read on public.messages;
create policy msg_read on public.messages for select
  using (member_id = auth.uid() or is_staff() or public.is_navigator_of(member_id));

-- insert as the member (about themselves)
drop policy if exists msg_ins_member on public.messages;
create policy msg_ins_member on public.messages for insert
  with check (member_id = auth.uid() and sender = 'member');

-- insert as staff (about anyone)
drop policy if exists msg_ins_staff on public.messages;
create policy msg_ins_staff on public.messages for insert
  with check (is_staff() and sender = 'staff');

-- insert as the member's navigator
drop policy if exists msg_ins_nav on public.messages;
create policy msg_ins_nav on public.messages for insert
  with check (public.is_navigator_of(member_id) and sender = 'navigator');

-- ============================================================
-- Promoting a navigator (the in-app "Add navigator" flow uses this):
--   1. The navigator signs up once with their email (normal sign-up).
--   2. An admin promotes them:
--        update public.profiles set role = 'navigator' where email = 'nav@example.com';
--      (The app does this for you from the Navigators screen.)
--   3. Assign members to them in the app (sets members.navigator_id).
--
-- VERIFY (do this before trusting it):
--   * Log in as a navigator with 0 assigned members -> they see NOBODY.
--   * Assign one member -> the navigator sees exactly that member + thread.
--   * Log in as a different navigator -> they do NOT see the first one's member.
--   * Log in as a plain member -> unchanged, sees only themselves.
-- ============================================================

-- ============================================================
-- INVITES + role guard + realtime  (run as part of this file)
-- ============================================================

-- Admin invites a navigator by email. When that person signs up with the
-- same email, they are auto-promoted to 'navigator'.
create table if not exists public.navigator_invites (
  email text primary key,
  name text,
  invited_at timestamptz default now()
);
alter table public.navigator_invites enable row level security;
drop policy if exists ni_staff on public.navigator_invites;
create policy ni_staff on public.navigator_invites for all
  using (is_staff()) with check (is_staff());

-- Auto-promote: when a profile is created (or its email set) and that email
-- was invited, make them a navigator.
create or replace function public.apply_navigator_invite()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if NEW.email is not null and exists (
    select 1 from public.navigator_invites ni where lower(ni.email) = lower(NEW.email)
  ) then
    NEW.role := 'navigator';
  end if;
  return NEW;
end $$;
drop trigger if exists trg_apply_navigator_invite on public.profiles;
create trigger trg_apply_navigator_invite
  before insert or update of email on public.profiles
  for each row execute function public.apply_navigator_invite();

-- Role guard: only staff may CHANGE a profile's role (closes self-promotion).
-- (The invite trigger above still works because it runs security definer.)
create or replace function public.guard_role_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if NEW.role is distinct from OLD.role and not is_staff() then
    NEW.role := OLD.role;   -- silently ignore unauthorized role changes
  end if;
  return NEW;
end $$;
drop trigger if exists trg_guard_role_change on public.profiles;
create trigger trg_guard_role_change
  before update on public.profiles
  for each row execute function public.guard_role_change();

-- Realtime for the message thread (member <-> navigator <-> admin).
-- RLS still applies, so each user only receives changes they may read.
do $$ begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null; when others then null; end $$;
