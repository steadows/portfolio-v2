-- Contact form messages table
-- Run this in Supabase Dashboard → SQL Editor after creating your project

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- RLS: deny all by default. Server actions use service_role which bypasses RLS.
alter table public.messages enable row level security;
