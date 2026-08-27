-- ============================================================
-- Wichita EPE Membership Hub — Goals, Reviews & Stories
-- Run once in Supabase → SQL Editor (safe to re-run).
-- ============================================================

-- 1) Member goals (ordered list, stored on members)
alter table public.members
  add column if not exists goals jsonb default '[]'::jsonb,
  add column if not exists other_partners jsonb default '[]'::jsonb,
  add column if not exists personal_contact text,
  add column if not exists wants_navigation text,
  add column if not exists navigator text,
  add column if not exists passions text,
  add column if not exists anf_interest text;

-- 1a) Baseline vs current tagging on essentials
alter table public.essential_assessments
  add column if not exists kind text default 'current';

-- 1a-2) Same baseline/current tag on the Full Path (Thrive-style stoplight)
--       so every snapshot is self-describing and clean to export to Thrive.
alter table public.path_assessments
  add column if not exists kind text default 'current';

-- 1b) Achievement attribution — who helped (on milestones)
alter table public.milestones
  add column if not exists primary_org text,
  add column if not exists secondary_org text;

-- 2) Ratings & Reviews (member owns their reviews)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.profiles(id) on delete cascade,
  org text not null,
  nps int,               -- 0..10  "recommend?"
  transformation int,    -- 0..10  "how much did this transform your life?"
  used_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.reviews enable row level security;
drop policy if exists rv_read on public.reviews;
create policy rv_read on public.reviews for select using (member_id = auth.uid() or is_staff());
drop policy if exists rv_ins on public.reviews;
create policy rv_ins on public.reviews for insert with check (member_id = auth.uid());
drop policy if exists rv_upd on public.reviews;
create policy rv_upd on public.reviews for update using (member_id = auth.uid());
drop policy if exists rv_del on public.reviews;
create policy rv_del on public.reviews for delete using (member_id = auth.uid());

-- 3) Transformation Stories (member owns; can mark public)
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.profiles(id) on delete cascade,
  title text,
  body text,
  is_public boolean default false,
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.stories enable row level security;
drop policy if exists st_read on public.stories;
create policy st_read on public.stories for select using (member_id = auth.uid() or is_staff() or is_public = true);
drop policy if exists st_ins on public.stories;
create policy st_ins on public.stories for insert with check (member_id = auth.uid());
drop policy if exists st_upd on public.stories;
create policy st_upd on public.stories for update using (member_id = auth.uid());
drop policy if exists st_del on public.stories;
create policy st_del on public.stories for delete using (member_id = auth.uid());
