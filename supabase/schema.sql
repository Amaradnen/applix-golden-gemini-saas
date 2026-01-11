-- APPLIX SaaS (MVP) schema
-- Run in Supabase SQL editor.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  total_cents integer not null,
  currency text not null default 'eur',
  status text not null default 'created',
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  name text not null,
  quantity integer not null default 1,
  unit_amount_cents integer not null,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);
