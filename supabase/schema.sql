-- ============================================================
-- Piccolinas Party Website — Supabase Schema
-- Run this in your Supabase project's SQL Editor
-- ============================================================

-- Gallery Images
create table if not exists public.gallery_images (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null,
  public_url   text not null,
  alt          text not null default '',
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now()
);

-- Services
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  subtitle    text not null default '',
  description text not null default '',
  image_url   text not null default '',
  is_featured boolean not null default false,
  sort_order  int     not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Shop Items
create table if not exists public.shop_items (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  category   text not null check (category in ('decorations', 'foamcutouts', 'pinatas')),
  image_url  text not null default '',
  badge      text,
  sort_order int  not null default 0,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  quote      text not null,
  author     text not null,
  event_type text not null default '',
  sort_order int  not null default 0,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Storage bucket for gallery images
-- Run this in Supabase Storage → New bucket → name: "media"
-- Or run via SQL:
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- ============================================================
-- Row Level Security
-- ============================================================

-- Enable RLS on all tables
alter table public.gallery_images  enable row level security;
alter table public.services        enable row level security;
alter table public.shop_items      enable row level security;
alter table public.testimonials    enable row level security;

-- Public can read active items
create policy "Public read gallery"     on public.gallery_images  for select using (true);
create policy "Public read services"    on public.services        for select using (active = true);
create policy "Public read shop_items"  on public.shop_items      for select using (active = true);
create policy "Public read testimonials" on public.testimonials   for select using (active = true);

-- Authenticated users (admin) can do everything
create policy "Admin all gallery"       on public.gallery_images  for all using (auth.role() = 'authenticated');
create policy "Admin all services"      on public.services        for all using (auth.role() = 'authenticated');
create policy "Admin all shop_items"    on public.shop_items      for all using (auth.role() = 'authenticated');
create policy "Admin all testimonials"  on public.testimonials    for all using (auth.role() = 'authenticated');

-- Storage: public read, authenticated write/delete
create policy "Public read media"  on storage.objects for select using (bucket_id = 'media');
create policy "Admin upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "Admin delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
