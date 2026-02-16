# Portfolio Rebuild Plan — Steve Meadows

## Vision
Ultra-modern, flashy, techie/militaristic data science portfolio. Think: dark theme, neon accents, grid overlays, terminal aesthetics, scan-line effects, subtle particle systems — like a command center meets a futuristic HUD.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Database/Auth:** Supabase (for future blog, contact form, analytics)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Animations:** Framer Motion + CSS animations
- **Hosting:** Vercel
- **Domain:** `steve-meadows.com` (Cloudflare) — email routing → `steve@steve-meadows.com`

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
      blog/
        page.tsx          # Blog index
        [slug]/page.tsx   # Individual blog post
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
- [x] **DinnerBot** (AI Meal Planning) — `dinnerbot`
  - Flesh out detail page content, screenshots/visuals, results narrative

### 6C: Statistics Projects (Medium Priority)
- [x] **Laplace Distribution** (Interactive Explorer) — `laplace-distribution`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [x] **Gun Violence Geospatial Analysis** — `gun-violence-geospatial`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [x] **Order History DFA** (Time Series) — `order-history-dfa`
  - Flesh out detail page content, screenshots/visuals, results narrative
- [x] **BJJ ADCC Analysis** (Tableau) — `bjj-adcc-analysis`
  - Flesh out detail page content, screenshots/visuals, results narrative

## Phase 7: About Page
> GSD Step 7 — Background and experience

- [x] Professional bio with personality
- [x] Timeline of education + experience (vertical timeline component)
- [x] Sections that reveal on scroll
- [x] Certifications & achievements with badge-style display
- [x] Philosophy / approach section

## Phase 8: Contact Page
> GSD Step 8 — Get in touch

- [x] Contact form wired to Supabase (name, email, message)
- [x] Clean terminal-inspired form styling (match HUD/dossier aesthetic)
- [x] Form validation with Shadcn form components + zod
- [x] Success state: "TRANSMISSION SENT" confirmation animation
- [x] Social links bar: GitHub, LinkedIn, `steve@stevemeadows.dev`
- [x] Email notification via Resend on contact form submission

## Phase 9: Blog
> GSD Step 9 — Articles, research, and work-in-progress

### 9A: Foundation & Index Page
- [x] **Blog data structure** (TypeScript): `BlogPost` interface + static data in `src/data/blog.ts`
  - Fields: slug, title, date, updated, excerpt, tags, category, readTime, featured, status (published/draft)
  - Categories: Article, Research, Tutorial, Work-in-Progress
- [x] **Blog index page** (`/blog`):
  - Page header matching site pattern (section index, GlitchText heading, accent divider, subtitle)
  - Filterable by category (tabs or pill buttons, consistent with projects page filter UX)
  - Post cards: title, date, excerpt, tags, estimated read time, category badge
  - Card hover: border glow + subtle lift (consistent with project cards)
  - Sort by date (newest first)
  - SectionReveal scroll animations on card grid
- [x] **Add "Blog" link to navbar** — between Projects and About

### 9B: Post Detail Page
- [x] **Blog detail page** (`/blog/[slug]`):
  - Post header: title (GlitchText), date, read time, category badge, tags
  - Content rendered from MDX via `next-mdx-remote`
  - Custom MDX components: styled code blocks, callouts/admonitions, inline images, blockquotes
  - Typography: readable long-form with Inter body, proper heading hierarchy, link styling
  - HUDBracket wrapper for content sections where appropriate
  - "Back to Blog" navigation link
  - Previous/Next post navigation at bottom
- [x] **MDX content files** in `src/content/blog/` with frontmatter
  - Frontmatter parsed to populate the data layer
  - Rich content support: syntax-highlighted code, embedded components, LaTeX math
- [x] **Custom MDX components** (`src/components/blog/`):
  - `CodeBlock.tsx` — Syntax-highlighted code with copy button and language label
  - `Callout.tsx` — Info/warning/tip admonition boxes styled with accent colors
  - `BlogImage.tsx` — next/image wrapper with caption and optional HUD frame
- [x] **`generateStaticParams`** for static generation of all published posts

### 9C: Polish
- [x] Empty state for filtered categories with no posts
- [x] Metadata & Open Graph tags per post (dynamic, from frontmatter)
- [x] Mobile-responsive post layout (readable on all screen sizes)
- [x] Respect `prefers-reduced-motion` on all animations

## Phase 10: Supabase Integration
> GSD Step 10 — Backend power

- [x] Set up Supabase project (create at supabase.com, run `supabase/migrations/20250215000000_create_messages_table.sql`)
- [x] Contact form submissions → `messages` table
- [ ] Optional: page view analytics → `page_views` table
- [ ] Optional: blog migration to Supabase CMS
  - `posts` table with markdown content
  - Dynamic blog routes
- [x] Environment variables configuration (`.env.example` + Vercel)
- [x] Email notification via Resend on contact form submission
- [ ] Optional: Gmail "Send mail as" `steve@steve-meadows.com` via Resend SMTP
  - Gmail Settings → Accounts → Send mail as → add domain with Resend SMTP credentials
  - Enables replying as your domain from Gmail / phone

## Phase 11: Performance, SEO & Polish
> GSD Step 11 — Ship it

- [ ] **Mobile Polish:** Fix specific sizing issues (ensure perfect adaptation to phone screens)
  - **Rule:** Mobile-first — only adjust base (unprefixed) Tailwind classes or add new responsive prefixes. Never remove or change existing `md:`/`lg:` classes unless explicitly needed.
  - **Watch for:** Fixed pixel values, hardcoded widths, `overflow-hidden` masking horizontal scroll issues, text sizes that don't scale down, padding/margins too large on small screens.
  - **Verify:** After each batch of changes, confirm both mobile (<375px, 390px) AND desktop (1280px+) render correctly — no regressions.
  - **Targets:** iPhone SE (375px), iPhone 15 (393px), standard Android (360px)
  - Audit pages: Home (Hero, Skills, Projects), Projects grid, Project detail, Blog index, Blog post, About, Contact, 404
- [ ] **Favicon System:** Create and add browser tab icon (`icon.png`, `apple-icon.png`)
- [ ] **Link Previews (Open Graph):** Configure social share previews (image, title, description) for texts/socials
- [ ] Lighthouse audit — target 90+ on all metrics
- [ ] Image optimization (next/image, WebP, lazy loading)
- [ ] `robots.txt` + `sitemap.xml` generation
- [ ] Reduce motion media query (respect `prefers-reduced-motion`)
- [ ] 404 page — themed to match site aesthetic
- [ ] Loading states / skeleton screens

## Phase 12: Deployment
> GSD Step 12 — Go live

- [x] Push to new GitHub repo (e.g., `steadows/portfolio-v2`)
- [x] Connect to Vercel
- [x] Configure custom domain (if purchased)
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
| Order History DFA (Time Series) | Stats | Medium |
| BJJ ADCC Analysis (Tableau) | Stats | Medium |

---

## Design Inspiration Keywords
For Cursor/AI prompting: "cyberpunk dashboard", "military HUD interface", "tactical operations center", "sci-fi command terminal", "neon grid dark UI", "glassmorphism dark mode"

---

## Hosting
**Platform:** Vercel (free tier) — native Next.js support, built-in image optimization, edge functions, deploy previews, full SSR/ISR.
**Domain:** `steve-meadows.com` via Cloudflare. Email routing: `steve@steve-meadows.com` → Gmail (free via Cloudflare Email Routing).

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
