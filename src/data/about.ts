// ─── About Page Data ─────────────────────────────────────────────────────────
// Structured data for the About page.
// Sourced from resume + project achievements.

// ─── Bio ─────────────────────────────────────────────────────────────────────

export const bio = {
  headline: "Data Scientist & ML Engineer",
  summary: [
    "I spent nearly two decades solving complex problems in technical environments — from live audio engineering to designing enterprise AV systems for 11,000+ users at MillerKnoll. Somewhere along the way, I realized the most interesting problems were the ones hiding in data.",
    "That realization launched a full pivot: a B.S. in Computer Science, an M.S. in Data Science & Analytics (both at Grand Valley State), and a growing portfolio of machine learning, deep learning, and statistical modeling projects that have earned multiple first-place finishes in Kaggle competitions.",
    "Now I'm on MillerKnoll's Lean AI team — a small, high-impact unit leading the company's AI/ML transformation. I build Narrow AI tools that slot directly into business workflows, ship predictive models that inform real decisions, and help drive agentic AI adoption across the org. Same intensity and precision I developed managing mission-critical live events — just pointed at a very different stage.",
  ],
  funFacts: [
    { label: "Career Pivot", value: "Audio → Tech → Data Science" },
    { label: "Kaggle Wins", value: "2× First Place" },
    { label: "Years in Tech", value: "19+" },
    { label: "Current Focus", value: "Lean AI @ MillerKnoll" },
  ],
} as const;

// ─── Experience Timeline ─────────────────────────────────────────────────────

export interface TimelineEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  /** Sort order (higher = more recent) */
  order: number;
  type: "work" | "education";
  accentColor: "cyan" | "green" | "amber" | "red";
  highlights: string[];
}

export const timeline: TimelineEntry[] = [
  {
    id: "millerknoll-lean-ai",
    role: "Associate Data Scientist",
    company: "MillerKnoll — Lean AI",
    location: "Holland, MI",
    period: "Nov 2025 – Present",
    order: 7,
    type: "work",
    accentColor: "green",
    highlights: [
      "Embedded on the Lean AI team — a dedicated team driving DS/AI/ML adoption across the entire organization",
      "Designing and shipping Narrow AI integration tools that plug directly into business workflows, making teams faster and sharper",
      "Building statistical and machine learning predictive models that turn operational data into forward-looking decisions",
      "Assisting with org-wide agentic AI integration — helping every corner of the business operate more intelligently at scale",
    ],
  },
  {
    id: "wine-ai",
    role: "Machine Learning Engineer",
    company: "Wine-AI Startup",
    location: "Holland, MI",
    period: "May 2025 – Present",
    order: 6,
    type: "work",
    accentColor: "cyan",
    highlights: [
      "Leading architectural design of proprietary predictive model for web-based wine industry software",
      "Built custom API and agentic AI scripts using LangChain and CrewAI with LLM/NLP integration",
      "Iteratively refined workflows to enhance model scalability and production deployment readiness",
    ],
  },
  {
    id: "millerknoll-ds",
    role: "Data Science Intern",
    company: "MillerKnoll",
    location: "Holland, MI",
    period: "Jul 2024 – Apr 2025",
    order: 5,
    type: "work",
    accentColor: "cyan",
    highlights: [
      "Built time series prediction model for North American contract orders — 61% improvement over legacy models",
      "Applied Dynamic Factor Analysis for dimensionality reduction while maintaining predictive power",
      "Conducted EDA, stationarity testing, correlation & seasonal decomposition for robust feature selection",
    ],
  },
  {
    id: "ms-dsa",
    role: "M.S. Data Science & Analytics",
    company: "Grand Valley State University",
    location: "Allendale, MI",
    period: "Expected Apr 2026",
    order: 4,
    type: "education",
    accentColor: "amber",
    highlights: [
      "Focus areas: machine learning, deep learning, statistical modeling, time series analysis",
      "Multiple 1st and 2nd place finishes in class-wide Kaggle competitions",
      "Thesis-track research in predictive analytics and applied ML",
    ],
  },
  {
    id: "millerknoll-it",
    role: "IT Analyst",
    company: "MillerKnoll",
    location: "Holland, MI",
    period: "Oct 2016 – Nov 2025",
    order: 3,
    type: "work",
    accentColor: "cyan",
    highlights: [
      "Designed and standardized 300+ global collaboration systems for 11,000+ users worldwide",
      "Led $5M Chicago flagship showroom AV system design project",
      "Managed mission-critical live AV technology for Board of Directors and executive leadership events",
    ],
  },
  {
    id: "bs-cs",
    role: "B.S. Computer Science",
    company: "Grand Valley State University",
    location: "Allendale, MI",
    period: "2020 – 2025",
    order: 2,
    type: "education",
    accentColor: "amber",
    highlights: [
      "Core studies in algorithms, data structures, systems programming, and software engineering",
      "Foundation in C, Java, Python, and database systems",
      "Elective focus on machine learning and data science",
    ],
  },
  {
    id: "audio-engineer",
    role: "Audio Engineer & Studio Manager",
    company: "Various Employers",
    location: "Multiple Locations",
    period: "2006 – 2021",
    order: 1,
    type: "work",
    accentColor: "red",
    highlights: [
      "15+ years managing complex technical environments under live, high-pressure conditions",
      "Developed deep problem-solving instincts, precision under pressure, and cross-functional collaboration",
      "Origin story — the technical curiosity that eventually led to computer science and data science",
    ],
  },
];

// ─── Achievements / Badges ───────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  icon: "trophy" | "medal" | "star" | "chart" | "code" | "brain";
  accentColor: "cyan" | "green" | "amber" | "red";
}

export const achievements: Achievement[] = [
  {
    id: "kaggle-1st-knn",
    title: "1st Place — Kaggle",
    subtitle: "kNN Recommender System (Birds)",
    icon: "trophy",
    accentColor: "green",
  },
  {
    id: "kaggle-1st-nn",
    title: "1st Place — Kaggle",
    subtitle: "Neural Network CITE (ADT Prediction)",
    icon: "trophy",
    accentColor: "green",
  },
  {
    id: "kaggle-2nd-vae",
    title: "2nd Place — Kaggle",
    subtitle: "Cross-Modal VAE (Biological Prediction)",
    icon: "medal",
    accentColor: "amber",
  },
  {
    id: "kaggle-2nd-wine",
    title: "2nd Place — Kaggle",
    subtitle: "Wine AI Transformer (Tasting Notes)",
    icon: "medal",
    accentColor: "amber",
  },
  {
    id: "dfa-improvement",
    title: "61% Model Improvement",
    subtitle: "Time Series — MillerKnoll DFA",
    icon: "chart",
    accentColor: "cyan",
  },
  {
    id: "global-systems",
    title: "300+ Systems Designed",
    subtitle: "Global Collaboration — MillerKnoll",
    icon: "code",
    accentColor: "cyan",
  },
];

// ─── Philosophy ──────────────────────────────────────────────────────────────

export const philosophy = {
  title: "APPROACH",
  principles: [
    {
      id: "rigor",
      label: "Statistical Rigor",
      description:
        "Every model starts with the data. Exploratory analysis, assumption checking, and proper validation aren't optional — they're the foundation everything else is built on.",
    },
    {
      id: "ship",
      label: "Ship Working Code",
      description:
        "A beautiful model that lives in a notebook isn't a solution. I prioritize clean, deployable code — from prototype to production pipeline — because insights don't matter if nobody can use them.",
    },
    {
      id: "communicate",
      label: "Communicate Clearly",
      description:
        "The best analysis in the world is useless if stakeholders can't understand it. I translate complex results into clear, actionable recommendations for technical and non-technical audiences alike.",
    },
    {
      id: "iterate",
      label: "Iterate Relentlessly",
      description:
        "First results are rarely final results. I treat every project as an iterative process — exploring, refining, benchmarking, and improving until the solution genuinely fits the problem.",
    },
  ],
} as const;
