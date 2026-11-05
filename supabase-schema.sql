-- ==============================================================================
-- Explore Sivasagar: Digital Heritage Museum
-- Supabase Storage & Database Setup for Community Photo Submissions
-- ==============================================================================

-- 1. Create the gallery_submissions table
create table if not exists public.gallery_submissions (
  id uuid default gen_random_uuid() primary key,
  collection_id text not null check (
    collection_id in (
      'palaces',
      'architecture',
      'temples-lakes',
      'unesco-heritage',
      'culture-traditions'
    )
  ),
  destination_id text not null,
  title text not null,
  description text default '',
  contributor_name text not null,
  image_url text not null,
  storage_path text default '',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  license text not null default 'Creative Commons (Contributor-Confirmed)',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.gallery_submissions enable row level security;

-- 3. Policy: Public can view only approved gallery submissions
drop policy if exists "Public can view approved gallery submissions" on public.gallery_submissions;
create policy "Public can view approved gallery submissions"
  on public.gallery_submissions for select
  using (status = 'approved');

-- 4. Policy: Anyone (anon) can insert new pending submissions
drop policy if exists "Public can submit pending photos" on public.gallery_submissions;
create policy "Public can submit pending photos"
  on public.gallery_submissions for insert
  with check (status = 'pending');

-- 5. Policy: Authenticated admin users can view, update, and delete all records
drop policy if exists "Admins can manage all gallery submissions" on public.gallery_submissions;
create policy "Admins can manage all gallery submissions"
  on public.gallery_submissions for all
  to authenticated
  using (true)
  with check (true);

-- ==============================================================================
-- Storage Bucket Instructions:
-- 1. In Supabase Dashboard -> Storage -> Create new bucket named: 'gallery-submissions'
-- 2. Set 'Public bucket' to ON (so approved photos can be loaded by image tags).
-- 3. File size limit: 5MB
-- 4. Allowed MIME types: image/jpeg, image/png, image/webp
-- ==============================================================================

