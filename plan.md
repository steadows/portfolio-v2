# Portfolio Rebuild Plan — Steve Meadows

## Vision
Ultra-modern, flashy, techie/militaristic data science portfolio. Think: dark theme, neon accents, grid overlays, terminal aesthetics, scan-line effects, subtle particle systems — like a command center meets a futuristic HUD.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Database/Auth:** Supabase (for future blog, contact form, analytics)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Animations:** Framer Motion + CSS animations
- **Hosting:** Vercel
- **Domain:** Custom domain (e.g., `steadows.dev`) — full URL control

## Design Language
- **Theme:** Dark base (#0a0a0f), neon accent colors (cyan, electric green, amber)
- **Typography:** Monospace headers (JetBrains Mono / Fira Code), clean sans-serif body (Inter)
- **Motifs:** Grid overlays, scan lines, glitch effects, terminal-style typing animations, subtle accent dividers
- **Micro-interactions:** Hover glows, magnetic cursor effects, parallax depth layers
- **Mobile:** Fully responsive — no compromises

---

## Phase 1: Project Scaffolding & Foundation
> GSD Step 1 — Get the skeleton up

- [x] Initialize Next.js project with App Router + TypeScript
- [x] Install & configure Tailwind CSS v4
- [x] Install & configure Shadcn/ui
- [x] Set up project structure:
  ```
  src/
    app/
      layout.tsx          # Root layout with fonts, metadata
      page.tsx            # Home / landing page
      projects/
        page.tsx          # Projects grid
        [slug]/page.tsx   # Individual project detail
      about/page.tsx      # About / bio
      contact/page.tsx    # Contact form
      not-found.tsx       # 404 page
    components/
      ui/                 # Shadcn components
      layout/             # Navbar, Footer, etc.
      sections/           # Hero, Skills, Projects, etc.
      effects/            # Particles, Scanlines, Glitch, etc.
    lib/                  # Utilities, supabase client, constants
    styles/               # Global CSS, animations
    data/                 # Static project data (JSON/TS)
  ```
- [x] Configure fonts (JetBrains Mono + Inter via `next/font`)
- [x] Set up base Tailwind theme (dark palette, neon accents, custom animations)
- [x] Create base layout with metadata & SEO

## Phase 2: Core Visual System & Effects
> GSD Step 2 — Build the atmosphere

- [x] **Background system:** Animated grid with subtle perspective + floating particles
- [x] **Scan-line overlay:** CSS pseudo-element with animated opacity
- [x] **Glitch text component:** Reusable `<GlitchText>` with CSS clip-path animation
- [x] **Terminal typing component:** `<TypeWriter>` with cursor blink
- [x] **HUD bracket component:** `<HUDBracket>` decorative frame for sections
- [x] **Neon glow utilities:** Tailwind classes for text-glow, box-glow, border-glow
- [x] **Cursor effects:** Magnetic follow + glow trail (optional, desktop only)
- [x] **Section transition animations:** Framer Motion scroll-triggered reveals

## Phase 3: Navigation & Layout Shell
> GSD Step 3 — Wire up navigation

- [x] **Navbar:** Fixed top bar with logo/name, nav links, animated underline indicators
  - Militaristic style: thin accent border, monospace labels, status-light dots
  - Mobile: hamburger → full-screen overlay with staggered reveal
- [x] **Footer:** Minimal — social links (GitHub, LinkedIn), copyright, "SYSTEM ONLINE" status badge
- [x] **Page transitions:** Framer Motion `AnimatePresence` between routes
- [x] **Scroll progress indicator:** Thin neon bar at top of viewport

## Phase 4: Hero / Landing Section
> GSD Step 4 — First impression

- [x] Full-viewport hero with layered elements:
  - Animated grid background
  - Large glitch-text name: `STEVE MEADOWS`
  - Subtitle typewriter: `Data Scientist | ML Engineer | Problem Solver`
  - Floating skill badges orbiting or arranged in a HUD pattern
  - CTA buttons with glow hover: `[VIEW PROJECTS]` `[CONTACT]`
- [x] Profile image with HUD-style frame + scan effect
- [x] Brief intro paragraph
- [x] Scroll-down indicator (animated chevron / radar ping)

## Phase 5: Skills / Tech Stack Section
> GSD Step 5 — Skills and tools

- [x] Section titled something like `TECH ARSENAL` or `SYSTEMS ONLINE`
- [x] Interactive skill categories (tabs or accordion):
  - Languages & Frameworks
  - ML / AI
  - Data & Visualization
  - Statistics
  - DevOps & Cloud
- [x] Visual: Skill cards with proficiency bars or radar chart
- [x] Hover effects: card lift + neon border glow


## Phase 6: Projects Showcase
> GSD Step 6 — The main event

### 6A: Foundation
- [x] **Projects grid page** (`/projects`):
  - Filterable by category (ML, Stats, CS, Databases)
  - Card design: thumbnail/preview, title, tags, brief description
  - Hover: card expands slightly, border glow, preview animation
- [x] **Project data structure** (TypeScript): `Project` interface + static data in `src/data/projects.ts`
- [ ] **Project detail page template** (`/projects/[slug]`):
  - Hero banner with project title + tags
  - Problem → Approach → Results narrative structure
  - Embedded visualizations / images
  - Tech stack badges
  - Links: GitHub repo, live demo, paper/notebook

### 6B: ML / AI Projects (High Priority)
- [x] **kNN Recommender System** (Birds) — `knn-recommender-birds`
  - Flesh out detail page content, screenshots/visuals, results narrative
  - 1st Place — Kaggle Challenge
- [x] **Neural Network CITE** (ADT Prediction) — `neural-network-cite`
  - Flesh out detail page content, screenshots/visuals, results narrative
  - 1st Place — Kaggle Challenge
- [x] **Cross-Modal VAE** (Biological Prediction) — `cross-modal-vae`
  - Flesh out detail page content, screenshots/visuals, results narrative
  - 2nd Place — Kaggle Challenge
- [x] **Wine AI** (Transformer Tasting Notes) — `wine-ai-transformer`
  - Flesh out detail page content, screenshots/visuals, results narrative
  - 2nd Place — Kaggle Challenge
- [x] **SVM & Dimensionality Reduction** (Student Achievement) — `svm-dimensionality-reduction`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [ ] **DinnerBot** (AI Meal Planning) — `dinnerbot`
  - Flesh out detail page content, screenshots/visuals, results narrative

### 6C: Statistics Projects (Medium Priority)
- [ ] **Laplace Distribution** (Interactive Explorer) — `laplace-distribution`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [ ] **Gun Violence Geospatial Analysis** — `gun-violence-geospatial`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [ ] **STA 631 Statistical Modeling Portfolio** — `sta631-portfolio`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [ ] **Order History DFA** (Time Series) — `order-history-dfa`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [ ] **BJJ ADCC Analysis** (Tableau) — `bjj-adcc-analysis`
  - Flesh out detail page content, screenshots/visuals, results narrative

### 6D: Database & CS Projects (Lower Priority)
- [ ] **Database Systems** (Oracle, MongoDB, Redis, Neo4j) — `database-projects`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [ ] **CS Fundamentals** (Algorithms & Systems) — `cs-projects`
  - Flesh out detail page content, screenshots/visuals, results narrative

## Phase 7: About Page
> GSD Step 7 — Background and experience

- [ ] Professional bio with personality
- [ ] Timeline of education + experience (vertical timeline component)
- [ ] Sections that reveal on scroll
- [ ] Certifications & achievements with badge-style display
- [ ] Philosophy / approach section

## Phase 8: Contact Page
> GSD Step 8 — Get in touch

- [ ] Contact form wired to Supabase (name, email, message)
- [ ] Clean terminal-inspired form styling
- [ ] Form validation with Shadcn form components + zod
- [ ] Success state: "Message sent" confirmation animation
- [ ] Alternative: social links (GitHub, LinkedIn, email)
- [ ] Optional: Supabase edge function for email notification

## Phase 9: Supabase Integration
> GSD Step 9 — Backend power

- [ ] Set up Supabase project
- [ ] Contact form submissions → `messages` table
- [ ] Optional: page view analytics → `page_views` table
- [ ] Optional: blog system (future)
  - `posts` table with markdown content
  - Dynamic blog routes
- [ ] Environment variables configuration

## Phase 10: Performance, SEO & Polish
> GSD Step 10 — Ship it

- [ ] Lighthouse audit — target 90+ on all metrics
- [ ] Image optimization (next/image, WebP, lazy loading)
- [ ] Metadata & Open Graph tags for every page
- [ ] `robots.txt` + `sitemap.xml` generation
- [ ] Reduce motion media query (respect `prefers-reduced-motion`)
- [ ] Favicon + PWA manifest
- [ ] 404 page — themed to match site aesthetic
- [ ] Loading states / skeleton screens

## Phase 11: Deployment
> GSD Step 11 — Go live

- [ ] Push to new GitHub repo (e.g., `steadows/portfolio-v2`)
- [ ] Connect to Vercel
- [ ] Configure custom domain (if purchased)
- [ ] Set environment variables (Supabase keys)
- [ ] Configure redirects from old GitHub Pages if needed
- [ ] Test production build

---

## Content Migration Checklist
Port these projects from the current site:

| Project | Category | Priority |
|---------|----------|----------|
| SVM & Dimensionality Reduction (Student Achievement) | ML | High |
| kNN Recommender System (Birds) — 1st Place | ML | High |
| Neural Network CITE (ADT Prediction) — 1st Place | ML | High |
| Cross-Modal VAE (Biological Prediction) — 2nd Place | ML | High |
| Wine AI (Transformer Tasting Notes) — 2nd Place | ML | High |
| Gun Violence Geospatial Analysis | Stats | Medium |
| STA 631 Statistical Modeling Portfolio | Stats | Medium |
| Order History DFA (Time Series) | Stats | Medium |
| BJJ ADCC Analysis (Tableau) | Stats | Medium |
| Database Projects (Oracle, MongoDB, Redis, Neo4j) | Database | Medium |
| CS Projects (Algorithms, Multithreading, Mobile) | CS | Low |

---

## Design Inspiration Keywords
For Cursor/AI prompting: "cyberpunk dashboard", "military HUD interface", "tactical operations center", "sci-fi command terminal", "neon grid dark UI", "glassmorphism dark mode"

---

## Hosting
**Platform:** Vercel (free tier) — native Next.js support, built-in image optimization, edge functions, deploy previews, full SSR/ISR.
**Domain:** Custom domain (e.g., `steadows.dev` ~$12/yr on Namecheap/Cloudflare) for full URL control.

---

## Environment Setup
Node.js and npm are managed via Conda. Before running any shell commands (`next dev`, `next build`, `npx`, etc.), activate the environment first:
```bash
source /opt/anaconda3/etc/profile.d/conda.sh && conda activate portfolio-v2
```
This provides Node v20 and npm. Without it, `node`/`npx`/`npm` will not be found in the sandbox.

## Notes
- All phases are designed to be iterable — each produces a working state
- GSD protocol: focus on shipping each phase before moving to the next
- Keep project data in TypeScript files initially; migrate to Supabase CMS later if needed
- The large HTML notebooks from the current site should be linked externally or converted to embedded previews rather than ported directly (they're 7-15MB each)
