-- ============================================================
-- Wichita EPE Membership Hub — CANONICAL SCHEMA
-- Run once in Supabase → SQL Editor. Safe to re-run (idempotent).
-- Supersedes new-tables.sql + hub-tables.sql (kept for history).
--
-- PORTABILITY NOTE (Thrive Lights):
--   The Full Path stoplight data lives in public.path_assessments.
--   Every indicator is stored as 'g' | 'y' | 'r' (green/yellow/red),
--   or 'na' (does not apply), keyed by a STABLE indicator id.
--   That maps 1:1 to a Thrive Lifemap:  g->Green, y->Yellow, r->Red.
--   See "Thrive-vs-Baseline-Crosswalk.xlsx" for the id -> Thrive #
--   crosswalk. Because ids never change, a future export is a pure
--   key-remap + colour-remap — no data reshaping required.
-- ============================================================

-- ----- profiles is assumed to already exist (Supabase auth mirror) -----
-- id uuid (= auth.uid()), full_name, email, phone, zip, role/is_staff()

-- ============================================================
-- 1) MEMBERS — one row per member (intake / demographics / goals)
-- ============================================================
alter table public.members
  add column if not exists race text,
  add column if not exists income text,
  add column if not exists household_income text,
  add column if not exists english_first text,
  add column if not exists household_size int,
  add column if not exists household_under18 int,
  add column if not exists journey_start date,
  add column if not exists share_consent boolean default false,
  add column if not exists partner_org text,               -- primary partner org
  add column if not exists personal_contact text,          -- preferred contact note
  add column if not exists wants_navigation text,          -- "help navigating the ecosystem?" yes/no
  add column if not exists navigator text,                 -- assigned navigator name (admin-set)
  add column if not exists passions text,                  -- "your passions and abilities?"
  add column if not exists anf_interest text,              -- Army of Normal Folks interest yes/no
  add column if not exists other_partners jsonb default '[]'::jsonb,
  add column if not exists goals jsonb default '[]'::jsonb; -- ordered list of bucket goals

-- ============================================================
-- 2) ESSENTIAL_ASSESSMENTS — the 7-Essentials intake wizard (answer-style)
--    kind distinguishes the locked baseline from ongoing check-ins.
-- ============================================================
alter table public.essential_assessments
  add column if not exists kind text default 'current';    -- 'baseline' | 'current'

-- ============================================================
-- 3) PATH_ASSESSMENTS — the Full Path (Thrive-style stoplight assessment)
--    answers = { now:{id:'g'|'y'|'r'}, then:{...}, na:{id:true}, _sat:int }
--    kind    = which tab the save came from ('baseline' | 'current').
--    THIS is the table you export to Thrive Lights.
-- ============================================================
create table if not exists public.path_assessments (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.members(profile_id) on delete cascade,
  answers jsonb,
  satisfaction int,                                        -- 0..10 life satisfaction
  kind text default 'current',                             -- 'baseline' | 'current'
  created_at timestamptz default now()
);
alter table public.path_assessments
  add column if not exists kind text default 'current';    -- add for existing installs
alter table public.path_assessments enable row level security;
drop policy if exists pa_read on public.path_assessments;
create policy pa_read on public.path_assessments for select using (member_id = auth.uid() or is_staff());
drop policy if exists pa_ins on public.path_assessments;
create policy pa_ins on public.path_assessments for insert with check (member_id = auth.uid());

-- ============================================================
-- 4) MILESTONES — member marks -> navigator confirms (+ attribution)
-- ============================================================
create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.profiles(id) on delete cascade,
  mkey text not null,
  status text not null default 'pending',                  -- pending | verified
  claimed_at timestamptz default now(),
  verified_at timestamptz,
  unique (member_id, mkey)
);
alter table public.milestones
  add column if not exists primary_org text,
  add column if not exists secondary_org text;
alter table public.milestones enable row level security;
drop policy if exists ms_read on public.milestones;
create policy ms_read on public.milestones for select using (member_id = auth.uid() or is_staff());
drop policy if exists ms_ins on public.milestones;
create policy ms_ins on public.milestones for insert with check (member_id = auth.uid() and status = 'pending');
drop policy if exists ms_del on public.milestones;
create policy ms_del on public.milestones for delete using (member_id = auth.uid() and status = 'pending');
drop policy if exists ms_upd on public.milestones;
create policy ms_upd on public.milestones for update using (is_staff());

-- ============================================================
-- 5) REVIEWS — member rates organizations they've used
-- ============================================================
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.profiles(id) on delete cascade,
  org text not null,
  nps int,                                                 -- 0..10 recommend?
  transformation int,                                      -- 0..10 life transformation?
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

-- ============================================================
-- 6) STORIES — member transformation stories (can be public)
-- ============================================================
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
