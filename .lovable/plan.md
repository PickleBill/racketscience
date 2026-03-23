
# MasterClass Racketry — Modern Luxury Sport Coaching Website

## Creative Direction
- **Palette**: Deep Charcoal (#1A1A1A) background, White (#FFFFFF) text, Electric Lime (#CCFF00) accents, subtle dark grays (#222, #2A2A2A) for cards
- **Typography**: Playfair Display (serif) for headlines, Inter (sans) for body
- **Aesthetic**: Dark luxury sport — spacious layouts, high contrast, glassmorphism cards, neon accent pops

## Pages & Sections (Single-Page Layout)

### 1. Hero Section
- Full-viewport dark background with subtle animated gradient overlay simulating slow-motion video atmosphere
- Biomechanical data overlay graphics (SVG vectors, angle lines, dotted trajectories) animated subtly
- Hero headline: "Mastery in Motion: Science-Backed Coaching for the Executive Athlete"
- Sub-headline text beneath
- Two CTAs: "Apply for Elite Coaching" (Electric Lime filled) and "View the Biomechanic Vault" (outlined)

### 2. Value Proposition — Three Columns
- Glassmorphism cards (semi-transparent, blurred background, subtle border)
- Three features: Bio-Vault, Prestige Booking, Progressive Mastery Roadmap
- Minimalist line icons in Electric Lime, clean descriptions

### 3. The Specialist Section
- Split layout: credential details on one side, certification seal badge on the other
- "Master-Certified" seal graphic (SVG badge with Electric Lime accents)
- Copy focused on biomechanical optimization, PE science, injury prevention
- Stats row: years of experience, certifications, athletes coached

### 4. Pricing Section (Boutique Model)
- Three tiered cards: Legacy Assessment ($200), Growth ($150/mo), Elite ($400/mo)
- Elite tier highlighted with Electric Lime border/glow
- Feature lists with checkmarks, clean typography

### 5. Bio-Vault Preview
- Mock mobile app UI rendered as a styled component
- Side-by-side swing comparison layout with overlay data captions
- "Wrist Angle: 42°" and "Impact Force: 88mph" data badges
- Subtle floating animation on the phone mockup

### 6. Target Audience Section
- "Designed for the Local Professional" headline
- Brief copy about executive scheduling, on-site coaching, local dominance
- Minimal layout with large typography

### 7. Testimonial / Member Story
- Quote card with large quotation marks
- David Sterling persona with title, quote text
- Star rating or subtle credibility indicators

### 8. Footer with Lead Capture
- "Reserve Your Assessment" form: Name, Email, Sport dropdown (Tennis/Padel/Squash), Current Ranking
- "Local Loyalty" badge
- Social links, copyright, minimal navigation

## Technical Approach
- All sections in `Index.tsx` composed from dedicated components
- Tailwind CSS custom theme extended with the brand colors and fonts
- Google Fonts loaded via `<link>` for Playfair Display and Inter
- Smooth scroll navigation
- Responsive design (mobile-first)
- SVG illustrations for biomechanical overlays and certification seal
