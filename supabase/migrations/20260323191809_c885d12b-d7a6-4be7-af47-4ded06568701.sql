-- 1. App role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- 3. RLS on user_roles: users can read their own roles
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 4. Admin SELECT on consultations
CREATE POLICY "Admins can view all consultations" ON public.consultations
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Admin SELECT on assessments
CREATE POLICY "Admins can view all assessments" ON public.assessments
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. Admin SELECT on bookings
CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Admin UPDATE on bookings (status changes)
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Add referred_by to bookings
ALTER TABLE public.bookings ADD COLUMN referred_by uuid;

-- 9. Referrals table
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_booking_id uuid REFERENCES public.bookings(id) ON DELETE SET NULL,
  reward_type text NOT NULL,
  redeemed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own referrals" ON public.referrals
  FOR SELECT TO authenticated
  USING (referrer_id = auth.uid());

CREATE POLICY "System can insert referrals" ON public.referrals
  FOR INSERT TO authenticated
  WITH CHECK (true);