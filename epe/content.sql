-- EPE Hub: shared, staff-editable app content
-- A generic key/JSON store so staff can manage content (starting with the
-- member Goals list) without a code change. Read by any signed-in user;
-- written only by staff. Run this once in the Supabase SQL editor.

create table if not exists public.app_content (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_content enable row level security;

-- Any signed-in user can read content (it drives the member app).
drop policy if exists app_content_read on public.app_content;
create policy app_content_read on public.app_content
  for select
  using (auth.uid() is not null);

-- Only staff can create/update/delete content.
-- is_staff() is defined by this project's earlier migrations.
drop policy if exists app_content_write on public.app_content;
create policy app_content_write on public.app_content
  for all
  using (is_staff())
  with check (is_staff());
