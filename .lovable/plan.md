

# MasterClass Racketry — Enhancement Plan

## Overview
Major upgrade: make all buttons functional, add sub-pages, enable Lovable Cloud for auth + booking, add hero imagery, enhance visual polish, and create a coaching journey experience.

---

## 1. Enable Lovable Cloud
- Spin up Lovable Cloud backend for authentication and database
- Set up email auth (sign in with email)
- Create database tables: `bookings`, `consultations`, `assessments`

## 2. Sticky Navigation Bar
- New `Navbar` component with smooth-scroll links to each section (Framework, Specialist, Pricing, Bio-Vault, Stories)
- Links to sub-pages: Process, Methodology, Free Consultation
- "Sign In" and "Book Now" buttons in the nav
- Glassmorphism style, fixed at top, appears on scroll

## 3. Hero Section Upgrade
- Add a high-quality Unsplash hero background image (dark racket sports imagery) with overlay
- Wire "Apply for Elite Coaching" → navigates to `/book` page
- Wire "View the Biomechanic Vault" → smooth-scrolls to Bio-Vault section
- Add subtle particle/floating glow effects

## 4. New Sub-Pages

### `/process` — "The Coaching Journey"
- Step-by-step visual timeline: Initial Assessment → Bio-Vault Analysis → Custom Program → Progressive Mastery
- Each step has an icon, description, and what the athlete experiences
- CTA at bottom to book a session

### `/methodology` — "The Science Behind the Swing"
- Sections on biomechanical analysis, kinetic chain optimization, injury prevention
- Data visualization mockups showing improvement metrics
- Coach credentials and philosophy deep-dive

### `/consultation` — "Free 5-Minute Assessment"
- Form: name, email, sport, experience level, goals, option to upload a video link
- Textarea for "Tell us about your game"
- Submit stores to Supabase `consultations` table
- Confirmation screen after submission

### `/book` — Booking Page (requires auth)
- Email sign-in/sign-up flow (Lovable Cloud auth)
- After auth: calendar-style date picker to select a session date
- Choose session type (Legacy Assessment, Group Clinic, Private Session)
- Time slot selection (morning/afternoon/evening)
- Confirmation with details saved to `bookings` table
- Post-booking: enter additional info (sport, ranking, goals)

### `/auth` — Sign In / Sign Up
- Simple email auth page using Supabase auth
- Redirect to `/book` after successful login

## 5. Wire All Existing Buttons
- Pricing "Get Started" buttons → navigate to `/book`
- Footer "Reserve My Assessment" form → saves to Supabase `assessments` table (or navigates to `/book`)
- Footer links (Privacy, Terms, Contact) → placeholder pages or modals
- Value Prop cards → clickable, link to `/methodology`
- Audience section items → link to `/consultation`
- Testimonial section → add a "Start Your Story" CTA linking to `/consultation`

## 6. Visual Enhancements
- Hero: dark sports background image with gradient overlay
- Add glow/pulse animations to section headers as they scroll into view
- Intersection Observer fade-in animations on all sections
- Subtle parallax on the Bio-Vault phone mockup
- Add more glow effects on card hovers (lime glow radiating outward)
- Pricing Elite card: animated border glow
- Add decorative background elements (gradient orbs, subtle grid patterns) between sections

## 7. Database Schema (via Lovable Cloud migrations)

```sql
-- Bookings table
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_type text not null,
  session_date date not null,
  time_slot text not null,
  sport text,
  ranking text,
  goals text,
  status text default 'confirmed',
  created_at timestamptz default now()
);

-- Free consultations (no auth required)
create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  sport text,
  experience_level text,
  goals text,
  video_link text,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Assessment reservations
create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  sport text,
  ranking text,
  created_at timestamptz default now()
);
```

RLS: bookings readable/insertable by authenticated users for their own rows. Consultations and assessments insertable by anyone (public lead capture).

## 8. File Changes Summary

**New files:**
- `src/components/Navbar.tsx` — sticky navigation
- `src/pages/Process.tsx` — coaching journey page
- `src/pages/Methodology.tsx` — science/methodology page
- `src/pages/Consultation.tsx` — free consultation form
- `src/pages/Book.tsx` — booking flow with auth gate
- `src/pages/Auth.tsx` — sign in/sign up
- `src/hooks/useScrollAnimation.ts` — Intersection Observer hook for fade-ins

**Modified files:**
- `src/App.tsx` — add routes for all new pages
- `src/pages/Index.tsx` — add Navbar, scroll animations
- `src/components/HeroSection.tsx` — background image, wire buttons
- `src/components/PricingSection.tsx` — wire buttons to `/book`
- `src/components/FooterSection.tsx` — wire form to Supabase
- `src/components/ValuePropSection.tsx` — make cards clickable
- `src/components/TestimonialSection.tsx` — add CTA button
- `src/components/AudienceSection.tsx` — add CTA links
- `src/components/BioVaultSection.tsx` — add "Explore the Vault" button
- `src/components/SpecialistSection.tsx` — add "Learn the Methodology" link
- `src/index.css` — additional animation keyframes, scroll-triggered classes

