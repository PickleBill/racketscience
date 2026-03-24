

# Racket Science — Rebrand, Open Booking & Polish

## 1. Rebrand to "Racket Science"

Update every reference to "MasterClass Racketry" across the codebase:
- **Navbar** logo text → "Racket Science"
- **HeroSection** tagline badge → "Racket Science"
- **Hero headline** → refreshed copy, e.g. "The Science of Your Swing" or similar
- **index.html** `<title>` tag
- **FooterSection** brand text
- **All sub-pages** (Process, Methodology, Consultation) header references

## 2. Open Booking Flow (No Auth Required)

Redesign `/book` so anyone can book without signing in:

- Remove the auth gate entirely
- Show the calendar + session type + time slot form to everyone
- Add an **email field** (required) so the booking is tied to an email, not a user account
- Add optional **Google / Apple OAuth** buttons: "Sign in for faster booking" — if they authenticate, pre-fill email and link `user_id`; if not, `user_id` is null and email is stored
- After booking confirmation, show the progressive info collection (sport, ranking, goals) as optional "tell us more" fields
- **Database**: make `bookings.user_id` nullable (migration) and add an `email` text column to `bookings`
- Update RLS: allow anonymous inserts (public INSERT policy) with email required
- Keep the referral `?ref=` param capture

## 3. Replace Spider-Man Stick Figures

- Remove the animated SVG stick-figure component (`SpiderManEasterEgg.tsx`)
- Replace with a high-quality AI-generated image placeholder: use an Unsplash/stock-style dark sports photo as a temporary visual, with a note in the copy referencing the "Spider-Man" nickname
- Add a prominent image container with overlay text telling the origin story
- The user can later swap in a real AI-generated image of two Spider-Man-dressed pickleball players pointing at each other

## 4. Visual & UX Enhancements

- **Stats banner**: Add an animated counter section between Specialist and Pricing showing key numbers (15+ years, 500+ athletes, 4 certifications, 3 sports)
- **Scroll progress indicator**: Thin lime progress bar at top of page
- **Section dividers**: Add subtle gradient line dividers between major sections
- **Process timeline**: Add connecting vertical line between steps on the Process page
- **Testimonial upgrade**: Add a second testimonial quote for social proof variety
- **CTA consistency**: Ensure every page ends with a clear CTA back to `/book`

## 5. Ensure All Flows Work

- Wire all "Get Started" / "Book Now" / "Apply" buttons to `/book` (no auth redirect)
- Footer form submits to `assessments` table (already working)
- Consultation form submits to `consultations` table (already working)
- Referral system remains auth-gated (need account to generate links)
- Admin dashboard remains auth+role-gated

## 6. Database Migration

```sql
-- Make user_id nullable for anonymous bookings
ALTER TABLE public.bookings ALTER COLUMN user_id DROP NOT NULL;

-- Add email column for non-authenticated bookings
ALTER TABLE public.bookings ADD COLUMN email text;

-- Update INSERT policy to allow public inserts
DROP POLICY "Users can create their own bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT TO public
  WITH CHECK (true);
```

## 7. File Changes

**Modified files:**
- `src/pages/Book.tsx` — remove auth gate, add email field, optional OAuth
- `src/components/Navbar.tsx` — rebrand logo
- `src/components/HeroSection.tsx` — rebrand copy
- `src/components/SpiderManEasterEgg.tsx` — replace SVG with image + story layout
- `src/components/SpecialistSection.tsx` — update references
- `src/components/FooterSection.tsx` — rebrand
- `src/components/PricingSection.tsx` — update copy
- `src/components/ValuePropSection.tsx` — update copy
- `src/components/TestimonialSection.tsx` — add second testimonial
- `src/components/AudienceSection.tsx` — update copy
- `src/components/BioVaultSection.tsx` — update copy
- `src/pages/Process.tsx` — rebrand, add timeline connector
- `src/pages/Methodology.tsx` — rebrand
- `src/pages/Consultation.tsx` — rebrand
- `src/pages/Auth.tsx` — rebrand
- `src/pages/Refer.tsx` — rebrand
- `src/pages/Admin.tsx` — rebrand
- `src/pages/Index.tsx` — add stats banner section
- `src/index.css` — add scroll progress bar styles
- `index.html` — update title

**New files:**
- `src/components/StatsSection.tsx` — animated counter section

**Database migration:**
- Make `user_id` nullable, add `email` column, update INSERT policy

