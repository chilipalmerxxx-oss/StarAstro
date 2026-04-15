/*
  # Create birth charts table
  
  1. New Tables
    - `birth_charts`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the person
      - `birth_date` (timestamptz) - Date and time of birth
      - `birth_place` (text) - Place of birth
      - `latitude` (numeric) - Birth place latitude
      - `longitude` (numeric) - Birth place longitude
      - `timezone_offset` (numeric) - Timezone offset in hours
      - `planet_positions` (jsonb) - Calculated planetary positions
      - `houses` (jsonb) - House cusps
      - `aspects` (jsonb) - Planetary aspects
      - `created_at` (timestamptz) - When the chart was created
  
  2. Security
    - Enable RLS on `birth_charts` table
    - Add policy for public read access (anyone can view charts)
    - Add policy for public insert access (anyone can create charts)
*/

CREATE TABLE IF NOT EXISTS birth_charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  birth_date timestamptz NOT NULL,
  birth_place text NOT NULL DEFAULT '',
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  timezone_offset numeric NOT NULL DEFAULT 0,
  planet_positions jsonb DEFAULT '{}'::jsonb,
  houses jsonb DEFAULT '{}'::jsonb,
  aspects jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view birth charts"
  ON birth_charts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create birth charts"
  ON birth_charts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);