
ALTER TABLE public.bookings ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS email text;

DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT TO public
  WITH CHECK (true);
