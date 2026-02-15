export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/projects" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin";
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/steadows",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/steadows",
    icon: "linkedin",
  },
];
