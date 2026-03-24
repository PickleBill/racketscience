

# Racket Science — Final Polish: OAuth, Bio-Vault Upgrade, Referral Landing, Stripe Shell & Design Sweep

## 1. Google & Apple OAuth on Booking Page

Use Lovable Cloud's managed OAuth via the `lovable.auth.signInWithOAuth()` method. Add Google and Apple sign-in buttons on the `/book` page above the email field as a "Quick Sign In" option. On successful auth, pre-fill the email and link `user_id`. Also add these to `/auth` page.

- Run the **Configure Social Auth** tool to generate the `src/integrations/lovable/` module
- Add two styled OAuth buttons: "Continue with Google" / "Continue with Apple"
- On auth callback, set email from session and continue booking flow

## 2. Bio-Vault Mockup Overhaul

Replace the crude stick-figure SVGs in `BioVaultSection.tsx` with a clean, data-driven analytical UI:

- Replace the two stick-figure panels with **data visualization mockups**: a radar/spider chart showing metrics (Power, Accuracy, Spin, Speed, Consistency) and a mini line chart showing "Progress Over 8 Weeks"
- Add more analytical data rows: Spin Rate (2,400rpm), Hip Rotation (78°), Kinetic Chain Score (91/100)
- Add a mini progress bar inside each metric card
- Keep the phone mockup frame but make the content feel like a real analytics dashboard

## 3. Referral Landing Page (`/claim`)

New public page at `/claim` — no auth required — shareable link for Casey to send friends:

- Headline: "Claim Your Free Lesson with Casey"
- Brief pitch copy about the coaching experience
- Simple form: Name, Email, Phone (optional), Sport dropdown
- Submit saves to `consultations` table with a `source: 'referral_claim'` indicator in the message field
- Confirmation screen: "You're in! Casey will reach out within 24 hours."
- Make it shareable: add social share buttons (copy link, share to text)
- Add route `/claim` to App.tsx

## 4. Stripe Checkout Shell (`/checkout`)

A simulated checkout page that looks like a real payment flow but just captures data:

- New page at `/checkout` with session details passed via URL params or state
- Clean payment form UI: card number field (disabled/placeholder), name, email
- "Complete Payment" button that saves to a new `checkout_intents` table (email, session_type, amount, status='pending')
- Success confirmation: "Payment reserved — we'll finalize when billing goes live"
- Wire pricing "Get Started" buttons: Legacy Assessment → `/checkout?type=legacy&amount=200`, etc.
- Database migration: create `checkout_intents` table with public INSERT policy

## 5. Improved Referral Flow in Booking Confirmation

After booking confirmation on `/book`:
- Show a "Share with a friend" card with a pre-written message and copy button
- Link: `{origin}/claim` — the public claim page
- No auth required to share; the claim page handles lead capture independently

## 6. Final Design Polish

- **Bio-Vault data cards everywhere**: Update the phone mockup SVGs globally to use clean geometric data viz (radar charts, progress bars) instead of stick figures
- **Section transitions**: Add staggered fade-in delays for grid items in ValueProp and Pricing sections
- **CTA button micro-interactions**: Add subtle scale + shadow transitions on all primary CTAs
- **Footer**: Add a "Share with a Friend" quick link to `/claim`
- **Navbar**: Add "Claim Free Lesson" as a highlighted nav item for non-authenticated users

## 7. Database Migration

```sql
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
```

## 8. File Changes Summary

**New files:**
- `src/pages/Claim.tsx` — public referral landing page
- `src/pages/Checkout.tsx` — Stripe shell checkout page

**Modified files:**
- `src/App.tsx` — add `/claim` and `/checkout` routes
- `src/pages/Book.tsx` — add Google/Apple OAuth buttons, update confirmation with share card
- `src/pages/Auth.tsx` — add Google/Apple OAuth buttons
- `src/components/BioVaultSection.tsx` — replace stick figures with radar chart + analytical data viz
- `src/components/PricingSection.tsx` — wire "Get Started" to `/checkout` with params
- `src/components/Navbar.tsx` — add "Free Lesson" link for non-auth users
- `src/components/FooterSection.tsx` — add share link

