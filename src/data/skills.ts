// ─── Skill Data ──────────────────────────────────────────────────────────────
// Static skill data for the Tech Arsenal section.
// Each category maps to a tab/accordion group.
// Sourced from resume + active project work.

export type SkillCategoryId =
  | "languages"
  | "ml-ai"
  | "data-viz"
  | "stats"
  | "devops";

export interface Skill {
  /** Display name */
  name: string;
  /** Proficiency level 0–100 */
  level: number;
  /** Optional icon identifier (for future icon integration) */
  icon?: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  /** Display label for tab/accordion header */
  label: string;
  /** Short label for compact displays */
  shortLabel: string;
  /** Accent color for this category */
  accentColor: "cyan" | "green" | "amber" | "red";
  /** Index prefix for HUD numbering (01, 02, etc.) */
  index: string;
  /** Skills within this category */
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "LANGUAGES & FRAMEWORKS",
    shortLabel: "LANGUAGES",
    accentColor: "cyan",
    index: "01",
    skills: [
      { name: "Python", level: 95 },
      { name: "R", level: 85 },
      { name: "SQL", level: 90 },
      { name: "C", level: 75 },
      { name: "Java", level: 70 },
      { name: "SAS", level: 65 },
    ],
  },
  {
    id: "ml-ai",
    label: "ML / AI",
    shortLabel: "ML / AI",
    accentColor: "green",
    index: "02",
    skills: [
      { name: "scikit-learn", level: 92 },
      { name: "PyTorch", level: 88 },
      { name: "LangChain", level: 85 },
      { name: "Ensemble Methods", level: 85 },
      { name: "TensorFlow", level: 82 },
      { name: "Hugging Face", level: 78 },
    ],
  },
  {
    id: "data-viz",
    label: "DATA & VISUALIZATION",
    shortLabel: "DATA & VIZ",
    accentColor: "amber",
    index: "03",
    skills: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 90 },
      { name: "Streamlit", level: 85 },
      { name: "Matplotlib", level: 82 },
      { name: "Tableau", level: 80 },
      { name: "Plotly", level: 78 },
    ],
  },
  {
    id: "stats",
    label: "STATISTICS",
    shortLabel: "STATISTICS",
    accentColor: "red",
    index: "04",
    skills: [
      { name: "Classification", level: 92 },
      { name: "Regression", level: 90 },
      { name: "Time Series", level: 88 },
      { name: "Hypothesis Testing", level: 85 },
      { name: "Dim. Reduction", level: 85 },
      { name: "Feature Engineering", level: 78 },
    ],
  },
  {
    id: "devops",
    label: "DEVOPS & CLOUD",
    shortLabel: "DEVOPS",
    accentColor: "cyan",
    index: "05",
    skills: [
      { name: "Git", level: 90 },
      { name: "Linux", level: 85 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 72 },
      { name: "Snowflake", level: 70 },
      { name: "Google Cloud", level: 68 },
    ],
  },
];

/** Total unique skill count */
export const totalSkillCount = skillCategories.reduce(
  (sum, cat) => sum + cat.skills.length,
  0
);
