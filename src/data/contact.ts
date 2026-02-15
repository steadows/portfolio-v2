// ─── Contact Page Data ────────────────────────────────────────────────────────
// Structured data for the Contact page.

// ─── Social Links ─────────────────────────────────────────────────────────────

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  /** Icon identifier — mapped to Lucide/react-icons in the component */
  icon: "github" | "linkedin" | "mail";
  accentColor: "cyan" | "green" | "amber";
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/steadows",
    icon: "github",
    accentColor: "cyan",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/stevemeadows",
    icon: "linkedin",
    accentColor: "cyan",
  },
  {
    id: "email",
    label: "steve@steve-meadows.com",
    href: "mailto:steve@steve-meadows.com",
    icon: "mail",
    accentColor: "green",
  },
];

// ─── Form Field Metadata ──────────────────────────────────────────────────────

export interface FormFieldMeta {
  name: "name" | "email" | "message";
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
}

export const formFields: FormFieldMeta[] = [
  {
    name: "name",
    label: "NAME",
    placeholder: "Your name",
    type: "text",
  },
  {
    name: "email",
    label: "EMAIL",
    placeholder: "your@email.com",
    type: "email",
  },
  {
    name: "message",
    label: "MESSAGE",
    placeholder: "Your message...",
    type: "textarea",
  },
];

// ─── Page Copy ────────────────────────────────────────────────────────────────

export const contactCopy = {
  sectionIndex: "FILE // 002",
  heading: "CONTACT",
  subtitle: "Let's connect — I'd love to hear from you",
  formLabel: "NEW MESSAGE",
  formStatus: "ONLINE",
  socialsLabel: "LINKS",
  socialsStatus: "ACTIVE",
  successHeading: "MESSAGE SENT",
  successMessage:
    "Message received. I'll get back to you as soon as possible.",
  endTag: "END OF FILE",
} as const;
