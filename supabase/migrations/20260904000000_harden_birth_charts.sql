/*
  Replace the forgeable x-session-id scheme with signed Supabase users.
  Anonymous sign-in must be enabled in Supabase Auth before deploying this migration.
*/

ALTER TABLE public.birth_charts
  ALTER COLUMN user_id SET DEFAULT auth.uid();

ALTER TABLE public.birth_charts
  ADD CONSTRAINT birth_charts_name_length
    CHECK (char_length(name) BETWEEN 1 AND 120) NOT VALID,
  ADD CONSTRAINT birth_charts_place_length
    CHECK (char_length(birth_place) BETWEEN 1 AND 240) NOT VALID,
  ADD CONSTRAINT birth_charts_latitude_range
    CHECK (latitude BETWEEN -90 AND 90) NOT VALID,
  ADD CONSTRAINT birth_charts_longitude_range
    CHECK (longitude BETWEEN -180 AND 180) NOT VALID,
  ADD CONSTRAINT birth_charts_timezone_range
    CHECK (timezone_offset BETWEEN -14 AND 14) NOT VALID,
  ADD CONSTRAINT birth_charts_planets_size
    CHECK (pg_column_size(planet_positions) <= 131072) NOT VALID,
  ADD CONSTRAINT birth_charts_houses_size
    CHECK (pg_column_size(houses) <= 65536) NOT VALID,
  ADD CONSTRAINT birth_charts_aspects_size
    CHECK (pg_column_size(aspects) <= 131072) NOT VALID;

DROP POLICY IF EXISTS "Anyone can view birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Anyone can create birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can view own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can create own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can update own birth charts" ON public.birth_charts;
DROP POLICY IF EXISTS "Users can delete own birth charts" ON public.birth_charts;

CREATE POLICY "Users can view own birth charts"
  ON public.birth_charts
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create own birth charts"
  ON public.birth_charts
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own birth charts"
  ON public.birth_charts
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own birth charts"
  ON public.birth_charts
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

REVOKE ALL ON TABLE public.birth_charts FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.birth_charts TO authenticated;
