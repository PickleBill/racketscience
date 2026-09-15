CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view settings"
  ON public.site_settings FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can update settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.notification_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL,
  source_id uuid,
  recipient text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.notification_log TO authenticated;
GRANT ALL ON public.notification_log TO service_role;
ALTER TABLE public.notification_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view notification log"
  ON public.notification_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update notification log"
  ON public.notification_log FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (key, value) VALUES
  ('notify_email', 'Casey.Degnan@gmail.com'),
  ('notify_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

CREATE OR REPLACE FUNCTION public.queue_casey_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_enabled text;
  v_recipient text;
  v_subject text;
  v_body text;
BEGIN
  SELECT value INTO v_enabled FROM public.site_settings WHERE key = 'notify_enabled';
  IF v_enabled = 'false' THEN
    RETURN NEW;
  END IF;
  SELECT value INTO v_recipient FROM public.site_settings WHERE key = 'notify_email';

  IF TG_TABLE_NAME = 'bookings' THEN
    v_subject := 'New Booking — ' || COALESCE(NEW.session_type, 'session') || ' — ' || COALESCE(NEW.session_date::text, '');
    v_body := 'New booking received on Racket Science.' || E'\n\n'
      || 'Email: ' || COALESCE(NEW.email, '—') || E'\n'
      || 'Session: ' || COALESCE(NEW.session_type, '—') || E'\n'
      || 'Date: ' || COALESCE(NEW.session_date::text, '—') || E'\n'
      || 'Time slot: ' || COALESCE(NEW.time_slot, '—') || E'\n'
      || 'Sport: ' || COALESCE(NEW.sport, '—') || E'\n'
      || 'Ranking: ' || COALESCE(NEW.ranking, '—') || E'\n'
      || 'Goals: ' || COALESCE(NEW.goals, '—') || E'\n'
      || 'Referred by: ' || COALESCE(NEW.referred_by, '—');
  ELSIF TG_TABLE_NAME = 'consultations' THEN
    v_subject := 'New Consultation Request — ' || COALESCE(NEW.name, NEW.email, '');
    v_body := 'New consultation request received on Racket Science.' || E'\n\n'
      || 'Name: ' || COALESCE(NEW.name, '—') || E'\n'
      || 'Email: ' || COALESCE(NEW.email, '—') || E'\n'
      || 'Sport: ' || COALESCE(NEW.sport, '—') || E'\n'
      || 'Experience level: ' || COALESCE(NEW.experience_level, '—') || E'\n'
      || 'Goals: ' || COALESCE(NEW.goals, '—');
  ELSE
    v_subject := 'New Assessment — ' || COALESCE(NEW.name, NEW.email, '');
    v_body := 'New video assessment request received on Racket Science.' || E'\n\n'
      || 'Name: ' || COALESCE(NEW.name, '—') || E'\n'
      || 'Email: ' || COALESCE(NEW.email, '—') || E'\n'
      || 'Sport: ' || COALESCE(NEW.sport, '—') || E'\n'
      || 'Ranking: ' || COALESCE(NEW.ranking, '—');
  END IF;

  INSERT INTO public.notification_log (source_type, source_id, recipient, subject, body)
  VALUES (TG_TABLE_NAME, NEW.id, v_recipient, v_subject, v_body);
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_new_booking
  AFTER INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.queue_casey_notification();

CREATE TRIGGER notify_new_consultation
  AFTER INSERT ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.queue_casey_notification();

CREATE TRIGGER notify_new_assessment
  AFTER INSERT ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.queue_casey_notification();