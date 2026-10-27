-- The database rules this site relies on, as they stand in the live Supabase
-- project on 27 October 2026. A SNAPSHOT for reading and auditing, not a
-- migration: everything below already exists, so running it would fail.
--
-- The browser writes straight to Supabase with the public key, so these are
-- the real locks; hiding a button in the app is only manners. Dumped from
-- the catalogue (pg_policies, pg_constraint, column privileges, pg_proc,
-- storage.buckets) after a classmate's security review asked for them to be
-- in the repo. The reviewers table's rows (who reviews) are not included,
-- and the project's address is written <project-ref>, as next.config.mjs
-- keeps it out of the repo too.
--
-- What to look for:
--   * A Community Note can only be inserted as 'pending' with no
--     review_note, and an author's edit must leave it 'pending': only
--     review_entry() can publish or return it.
--   * Column grants: an author can't write review_note, created_at, or
--     (on update) owner and slug, whatever the policy says.
--   * photo_url_ours: a photo URL must be in the photos bucket, inside the
--     row owner's own folder.
--   * Storage: each account uploads, sees and deletes only its own folder;
--     the curator may see and delete any photo.


-- ── Row-level security ──────────────────────────────────────────────────

-- RLS on public.contributions: t
-- RLS on public.entries: t
-- RLS on public.profiles: t
-- RLS on public.reviewers: t   (no policies: only the SQL Editor reads or writes it)


-- ── Policies: contributions (Community Notes) ───────────────────────────

create policy "anyone can read published contributions" on public.contributions as permissive for select to anon, authenticated
  using (((status = 'published'::text) OR (( SELECT auth.uid() AS uid) = owner) OR ( SELECT is_reviewer() AS is_reviewer)));

create policy "contributors add their own" on public.contributions as permissive for insert to authenticated
  with check (((( SELECT auth.uid() AS uid) = owner) AND (status = 'pending'::text) AND (review_note IS NULL)));

create policy "contributors delete their own" on public.contributions as permissive for delete to authenticated
  using ((( SELECT auth.uid() AS uid) = owner));

create policy "contributors edit their own" on public.contributions as permissive for update to authenticated
  using ((( SELECT auth.uid() AS uid) = owner))
  with check (((( SELECT auth.uid() AS uid) = owner) AND ((status = 'pending'::text) OR ( SELECT is_reviewer() AS is_reviewer))));

create policy "the curator deletes any contribution" on public.contributions as permissive for delete to authenticated
  using ((( SELECT ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text)) = 'curator'::text));


-- ── Policies: entries (Field Notes, the curator's) ──────────────────────

create policy "anyone can read entries" on public.entries as permissive for select to public
  using (true);

create policy "the curator adds entries" on public.entries as permissive for insert to authenticated
  with check (((( SELECT auth.uid() AS uid) = owner) AND (( SELECT ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text)) = 'curator'::text)));

create policy "the curator deletes their own entries" on public.entries as permissive for delete to authenticated
  using (((( SELECT auth.uid() AS uid) = owner) AND (( SELECT ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text)) = 'curator'::text)));

create policy "the curator edits their own entries" on public.entries as permissive for update to authenticated
  using (((( SELECT auth.uid() AS uid) = owner) AND (( SELECT ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text)) = 'curator'::text)))
  with check (((( SELECT auth.uid() AS uid) = owner) AND (( SELECT ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text)) = 'curator'::text)));


-- ── Policies: profiles (display names) ──────────────────────────────────

create policy "anyone can read display names" on public.profiles as permissive for select to anon, authenticated
  using (true);

create policy "people rename themselves" on public.profiles as permissive for update to authenticated
  using ((( SELECT auth.uid() AS uid) = id))
  with check ((( SELECT auth.uid() AS uid) = id));


-- ── Policies: storage (the photos bucket) ───────────────────────────────

create policy "contributors upload into their own folder" on storage.objects as permissive for insert to authenticated
  with check (((bucket_id = 'photos'::text) AND ((storage.foldername(name))[1] = ( SELECT (auth.uid())::text AS uid))));

create policy "contributors see their own photos" on storage.objects as permissive for select to authenticated
  using (((bucket_id = 'photos'::text) AND ((storage.foldername(name))[1] = ( SELECT (auth.uid())::text AS uid))));

create policy "contributors delete their own photos" on storage.objects as permissive for delete to authenticated
  using (((bucket_id = 'photos'::text) AND ((storage.foldername(name))[1] = ( SELECT (auth.uid())::text AS uid))));

create policy "the curator sees every photo" on storage.objects as permissive for select to authenticated
  using (((bucket_id = 'photos'::text) AND (( SELECT ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text)) = 'curator'::text)));

create policy "the curator deletes any photo" on storage.objects as permissive for delete to authenticated
  using (((bucket_id = 'photos'::text) AND (( SELECT ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text)) = 'curator'::text)));

-- bucket photos: public t, max 5242880 bytes, types {image/jpeg,image/png,image/webp}


-- ── Check constraints: contributions ────────────────────────────────────

alter table contributions add constraint body_has_text CHECK (has_text(body));
alter table contributions add constraint body_km_has_text CHECK (((body_km IS NULL) OR has_text(body_km)));
alter table contributions add constraint body_km_length CHECK (((body_km IS NULL) OR (char_length(TRIM(BOTH FROM body_km)) <= 10000)));
alter table contributions add constraint body_length CHECK (((char_length(TRIM(BOTH FROM body)) >= 50) AND (char_length(TRIM(BOTH FROM body)) <= 10000)));
alter table contributions add constraint khmer_name_has_text CHECK (((khmer_name IS NULL) OR has_text(khmer_name)));
alter table contributions add constraint khmer_name_length CHECK (((khmer_name IS NULL) OR (char_length(TRIM(BOTH FROM khmer_name)) <= 120)));
alter table contributions add constraint photo_url_ours CHECK (((photo_url IS NULL) OR (photo_url ~~ (('https://<project-ref>.supabase.co/storage/v1/object/public/photos/'::text || (owner)::text) || '/%'::text))));
alter table contributions add constraint review_note_text CHECK (((review_note IS NULL) OR (has_text(review_note) AND (char_length(review_note) <= 500))));
alter table contributions add constraint sources_has_text CHECK (has_text(sources));
alter table contributions add constraint sources_km_has_text CHECK (((sources_km IS NULL) OR has_text(sources_km)));
alter table contributions add constraint sources_km_length CHECK (((sources_km IS NULL) OR (char_length(TRIM(BOTH FROM sources_km)) <= 500)));
alter table contributions add constraint sources_length CHECK (((char_length(TRIM(BOTH FROM sources)) >= 3) AND (char_length(TRIM(BOTH FROM sources)) <= 500)));
alter table contributions add constraint status_known CHECK ((status = ANY (ARRAY['pending'::text, 'published'::text, 'returned'::text])));
alter table contributions add constraint tags_count CHECK (((tags IS NULL) OR (cardinality(tags) <= 6)));
alter table contributions add constraint tags_km_count CHECK (((tags_km IS NULL) OR (cardinality(tags_km) <= 6)));
alter table contributions add constraint tags_km_length CHECK (((tags_km IS NULL) OR (char_length(array_to_string(tags_km, ','::text)) <= 200)));
alter table contributions add constraint tags_length CHECK (((tags IS NULL) OR (char_length(array_to_string(tags, ','::text)) <= 200)));
alter table contributions add constraint title_has_text CHECK (has_text(title));
alter table contributions add constraint title_km_has_text CHECK (((title_km IS NULL) OR has_text(title_km)));
alter table contributions add constraint title_km_length CHECK (((title_km IS NULL) OR (char_length(TRIM(BOTH FROM title_km)) <= 120)));
alter table contributions add constraint title_length CHECK (((char_length(TRIM(BOTH FROM title)) >= 3) AND (char_length(TRIM(BOTH FROM title)) <= 120)));


-- ── Check constraints: entries ──────────────────────────────────────────

alter table entries add constraint body_has_text CHECK (has_text(body));
alter table entries add constraint body_km_has_text CHECK (((body_km IS NULL) OR has_text(body_km)));
alter table entries add constraint body_km_length CHECK (((body_km IS NULL) OR (char_length(TRIM(BOTH FROM body_km)) <= 10000)));
alter table entries add constraint body_length CHECK (((char_length(TRIM(BOTH FROM body)) >= 50) AND (char_length(TRIM(BOTH FROM body)) <= 10000)));
alter table entries add constraint khmer_name_has_text CHECK (((khmer_name IS NULL) OR has_text(khmer_name)));
alter table entries add constraint khmer_name_length CHECK (((khmer_name IS NULL) OR (char_length(TRIM(BOTH FROM khmer_name)) <= 120)));
alter table entries add constraint photo_url_ours CHECK (((photo_url IS NULL) OR (photo_url ~ '^/[a-z0-9-]+\.jpg$'::text) OR (photo_url ~~ (('https://<project-ref>.supabase.co/storage/v1/object/public/photos/'::text || (owner)::text) || '/%'::text))));
alter table entries add constraint sources_has_text CHECK (has_text(sources));
alter table entries add constraint sources_km_has_text CHECK (((sources_km IS NULL) OR has_text(sources_km)));
alter table entries add constraint sources_km_length CHECK (((sources_km IS NULL) OR (char_length(TRIM(BOTH FROM sources_km)) <= 500)));
alter table entries add constraint sources_length CHECK (((char_length(TRIM(BOTH FROM sources)) >= 3) AND (char_length(TRIM(BOTH FROM sources)) <= 500)));
alter table entries add constraint status_known CHECK ((status = ANY (ARRAY['published'::text, 'in-progress'::text])));
alter table entries add constraint tags_count CHECK (((tags IS NULL) OR (cardinality(tags) <= 6)));
alter table entries add constraint tags_km_count CHECK (((tags_km IS NULL) OR (cardinality(tags_km) <= 6)));
alter table entries add constraint tags_km_length CHECK (((tags_km IS NULL) OR (char_length(array_to_string(tags_km, ','::text)) <= 200)));
alter table entries add constraint tags_length CHECK (((tags IS NULL) OR (char_length(array_to_string(tags, ','::text)) <= 200)));
alter table entries add constraint title_has_text CHECK (has_text(title));
alter table entries add constraint title_km_has_text CHECK (((title_km IS NULL) OR has_text(title_km)));
alter table entries add constraint title_km_length CHECK (((title_km IS NULL) OR (char_length(TRIM(BOTH FROM title_km)) <= 120)));
alter table entries add constraint title_length CHECK (((char_length(TRIM(BOTH FROM title)) >= 3) AND (char_length(TRIM(BOTH FROM title)) <= 120)));


-- ── Check constraints: profiles ─────────────────────────────────────────

alter table profiles add constraint display_name_length CHECK (((char_length(TRIM(BOTH FROM display_name)) >= 2) AND (char_length(TRIM(BOTH FROM display_name)) <= 50)));


-- ── Column grants (anon = logged out, authenticated = logged in) ────────
-- Grants say which columns a role may touch at all; RLS above says which
-- rows. Where a role has a grant but no policy (entries for anon,
-- reviewers for everyone), RLS refuses every row.

grant INSERT (body, body_km, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.contributions to authenticated;
grant UPDATE (body, body_km, khmer_name, photo_url, sources, sources_km, status, tags, tags_km, title, title_km) on public.contributions to authenticated;
grant SELECT (body, body_km, created_at, id, khmer_name, owner, photo_url, review_note, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.contributions to anon;
grant SELECT (body, body_km, created_at, id, khmer_name, owner, photo_url, review_note, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.contributions to authenticated;
grant REFERENCES (body, body_km, created_at, id, khmer_name, owner, photo_url, review_note, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.contributions to anon;
grant REFERENCES (body, body_km, created_at, id, khmer_name, owner, photo_url, review_note, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.contributions to authenticated;

grant INSERT (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to anon;
grant INSERT (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to authenticated;
grant UPDATE (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to anon;
grant UPDATE (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to authenticated;
grant SELECT (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to anon;
grant SELECT (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to authenticated;
grant REFERENCES (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to anon;
grant REFERENCES (body, body_km, created_at, fig_number, id, khmer_name, owner, photo_url, slug, sources, sources_km, status, tags, tags_km, title, title_km) on public.entries to authenticated;

grant UPDATE (display_name) on public.profiles to authenticated;
grant INSERT (created_at, display_name, id) on public.profiles to anon;
grant INSERT (created_at, display_name, id) on public.profiles to authenticated;
grant SELECT (created_at, display_name, id) on public.profiles to anon;
grant SELECT (created_at, display_name, id) on public.profiles to authenticated;
grant REFERENCES (created_at, display_name, id) on public.profiles to anon;
grant REFERENCES (created_at, display_name, id) on public.profiles to authenticated;

grant INSERT (user_id) on public.reviewers to anon;
grant INSERT (user_id) on public.reviewers to authenticated;
grant UPDATE (user_id) on public.reviewers to anon;
grant UPDATE (user_id) on public.reviewers to authenticated;
grant SELECT (user_id) on public.reviewers to anon;
grant SELECT (user_id) on public.reviewers to authenticated;
grant REFERENCES (user_id) on public.reviewers to anon;
grant REFERENCES (user_id) on public.reviewers to authenticated;


-- ── Functions ───────────────────────────────────────────────────────────
-- Who may call each one:
--   review_entry()     authenticated only (anon: f); checks is_reviewer() inside
--   is_reviewer()      anon and authenticated; answers only for the caller
--   has_text()         anon and authenticated; pure, used by the constraints
--   handle_new_user()  a trigger function: the API can't call it directly
--   rls_auto_enable()  an event trigger (Supabase's own): turns RLS on for new tables

CREATE OR REPLACE FUNCTION public.review_entry(entry_id uuid, decision text, note text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not public.is_reviewer() then
    return false;
  end if;
  if decision = 'published' then
    update public.contributions set status = 'published', review_note = null
      where id = entry_id and status = 'pending';
  elsif decision = 'returned' then
    update public.contributions
       set status = 'returned',
           review_note = case when public.has_text(note) then note end
     where id = entry_id and status in ('pending', 'published');
  else
    return false;
  end if;
  return found;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_reviewer()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select exists (select 1 from public.reviewers where user_id = (select auth.uid()));
$function$
;

CREATE OR REPLACE FUNCTION public.has_text(t text)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO ''
-- The list of characters trimmed below holds invisible spaces (no-break,
-- zero-width, ideographic); copying out of the SQL Editor may have turned
-- some of them into plain spaces. The live function is the authority.
AS $function$
  select char_length(btrim(t, E' \t\n\r\f\v               　')) > 0
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, display_name)
  values (new.id, trim(new.raw_user_meta_data ->> 'display_name'));
  return new;
end;
$function$
;
