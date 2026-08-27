-- ============================================================
-- Wichita EPE — "Is my SQL up to date?" checker
-- Paste into Supabase → SQL Editor and RUN. Read-only; changes nothing.
-- Every row shows OK or MISSING. If anything says MISSING, re-run the
-- file named in the last column (all files are safe to re-run).
-- ============================================================
with
cols(t,c,src) as (values
  ('members','goals','hub-tables.sql'),
  ('members','other_partners','hub-tables.sql'),
  ('members','personal_contact','hub-tables.sql'),
  ('members','wants_navigation','hub-tables.sql'),
  ('members','navigator','hub-tables.sql'),
  ('members','passions','hub-tables.sql'),
  ('members','anf_interest','hub-tables.sql'),
  ('members','navigator_id','navigator.sql'),
  ('members','partner_org','new-tables.sql / schema.sql'),
  ('members','household_size','new-tables.sql / schema.sql'),
  ('members','household_under18','new-tables.sql / schema.sql'),
  ('members','journey_start','new-tables.sql / schema.sql'),
  ('members','share_consent','new-tables.sql / schema.sql'),
  ('essential_assessments','kind','hub-tables.sql / schema.sql'),
  ('path_assessments','kind','hub-tables.sql / schema.sql'),
  ('milestones','primary_org','hub-tables.sql / schema.sql'),
  ('milestones','secondary_org','hub-tables.sql / schema.sql')
),
tbls(t,src) as (values
  ('profiles','(base install)'),
  ('members','(base install)'),
  ('essential_assessments','(base install)'),
  ('path_assessments','new-tables.sql / schema.sql'),
  ('milestones','new-tables.sql / schema.sql'),
  ('reviews','hub-tables.sql / schema.sql'),
  ('stories','hub-tables.sql / schema.sql'),
  ('messages','navigator.sql'),
  ('navigator_invites','navigator.sql')
),
fns(f,src) as (values
  ('is_staff','(base install — must already exist)'),
  ('is_navigator_of','navigator.sql'),
  ('apply_navigator_invite','navigator.sql'),
  ('guard_role_change','navigator.sql')
),
trigs(tg,src) as (values
  ('trg_apply_navigator_invite','navigator.sql'),
  ('trg_guard_role_change','navigator.sql')
)
select * from (
  select 'column'  as kind, t||'.'||c as item,
    case when exists(select 1 from information_schema.columns i
       where i.table_schema='public' and i.table_name=cols.t and i.column_name=cols.c)
       then 'OK' else 'MISSING' end as status, src as run_this
  from cols
  union all
  select 'table', t,
    case when to_regclass('public.'||t) is not null then 'OK' else 'MISSING' end, src
  from tbls
  union all
  select 'function', f||'()',
    case when exists(select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
       where n.nspname='public' and p.proname=fns.f) then 'OK' else 'MISSING' end, src
  from fns
  union all
  select 'trigger', tg,
    case when exists(select 1 from pg_trigger where tgname=trigs.tg and not tgisinternal)
       then 'OK' else 'MISSING' end, src
  from trigs
  union all
  select 'realtime', 'messages in supabase_realtime',
    case when exists(select 1 from pg_publication_tables
       where pubname='supabase_realtime' and schemaname='public' and tablename='messages')
       then 'OK' else 'MISSING' end, 'navigator.sql'
) q
order by (status='OK'), kind, item;   -- MISSING rows float to the top
