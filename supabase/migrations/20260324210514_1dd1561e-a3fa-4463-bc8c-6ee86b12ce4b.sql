CREATE TABLE public.checkout_intents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  session_type text,
  amount integer,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.checkout_intents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create checkout intents"
  ON public.checkout_intents FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view checkout intents"
  ON public.checkout_intents FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));