

# MasterClass Racketry — Admin Dashboard, Visual Upgrades, Spider-Man Easter Egg & Referral System

## 1. Admin Dashboard (`/admin`)

**Database changes:**
- Create `user_roles` table with `app_role` enum (`admin`, `user`) and a `has_role()` security definer function
- Add SELECT policies on `consultations` and `assessments` tables for admin users
- Add SELECT/UPDATE policies on `bookings` for admin users

**Page:** `/admin` route, auth-gated with admin role check
- Three tabs: Bookings, Consultations, Assessments
- Each tab shows a data table with key columns (name, email, sport, date, status)
- Status badges (confirmed/pending) with lime accent
- Simple status update capability on bookings (confirmed → completed → cancelled)
- Dark glassmorphism table styling consistent with site aesthetic

**Navbar:** Add "Dashboard" link visible only when user has admin role

## 2. Hero Images on Process & Methodology Pages

- Add dark sports photography hero banners (from Unsplash URLs via `create_asset`) to both `/process` and `/methodology` pages
- Full-width hero with gradient overlay (same treatment as main hero)
- Keep existing content below, just add visual impact at top

## 3. Spider-Man / "Spider-Casey" Easter Egg in Specialist Section

- Add a fun subsection in the Specialist bio area with the nickname origin story
- Create an **animated SVG illustration** of two pickleball players in Spider-Man-style poses pointing at each other, with pickleballs instead of webs — stylized and minimal (line art with lime accents on dark background), keeping it premium/not cartoony
- Brief copy: *"Fun fact: Casey earned the nickname 'Spider-Man' when he first started — for his uncanny court coverage and reflexes that seemed to defy physics. Some things never change."*
- The illustration animates on scroll (players slide in from sides, pickleballs "fly" with dotted trajectory lines)

## 4. Referral System ("Share the Court")

**Concept:** Experiential, not transactional. Rewards are experiences — free lesson, free body bag, or a pro teammate for a match.

**How it works:**
- Any authenticated user gets a "Share the Court" section on their booking confirmation page and in the navbar dropdown
- They can generate a personal referral link: `?ref=<user_id>` appended to the booking page URL
- One-click copy button with a fun message: *"I found my secret weapon. Your turn."*
- The booking page reads the `ref` query param and stores it in the `bookings` table

**Database changes:**
- Add `referred_by` column (uuid, nullable) to `bookings` table
- Add `referrals` table to track rewards: `id`, `referrer_id`, `referred_booking_id`, `reward_type`, `redeemed`, `created_at`

**Reward display:** After a referred booking is confirmed, the referrer sees a toast/notification about their reward. Rewards rotate playfully:
- "Free lesson on us"
- "Premium body bag — yours"  
- "A pro plays on your team next match"

**Referral page component:** Simple `/refer` page where logged-in users can:
- See their unique link with copy button
- See how many friends they've brought in
- See earned rewards

## 5. File Changes Summary

**New files:**
- `src/pages/Admin.tsx` — admin dashboard with tabs
- `src/pages/Refer.tsx` — referral link generator & reward tracker
- `src/components/SpiderManEasterEgg.tsx` — animated SVG illustration

**Modified files:**
- `src/App.tsx` — add `/admin` and `/refer` routes
- `src/components/Navbar.tsx` — add Dashboard (admin) and Share the Court links
- `src/components/SpecialistSection.tsx` — add Spider-Man nickname story + illustration
- `src/pages/Process.tsx` — add hero image banner
- `src/pages/Methodology.tsx` — add hero image banner
- `src/pages/Book.tsx` — read `ref` query param, store in booking, show referral CTA on confirmation

**Database migrations:**
- Create `user_roles` table + `app_role` enum + `has_role()` function
- Add SELECT policies on `consultations`/`assessments` for admins
- Add admin SELECT/UPDATE on `bookings`
- Add `referred_by` column to `bookings`
- Create `referrals` table with RLS

