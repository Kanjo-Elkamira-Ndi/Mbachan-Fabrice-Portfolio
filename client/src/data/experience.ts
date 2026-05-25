import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: 1,
    organization: "Independent Consulting",
    role: "Cybersecurity Consultant & Penetration Tester",
    period: "2022 — Present",
    location: "Cameroon / Remote",
    highlights: [
      "Conducted 20+ web application penetration tests for fintech and e-commerce clients",
      "Implemented DevSecOps pipelines reducing deployment vulnerabilities by 60%",
      "Delivered security awareness training to 200+ developers across 5 organizations",
    ],
  },
  {
    id: 2,
    organization: "Previous Organization",
    role: "Security Engineer",
    period: "2020 — 2022",
    location: "Cameroon",
    highlights: [
      "Managed SIEM infrastructure monitoring 500+ endpoints",
      "Led incident response for 3 major security events with zero data loss",
      "Authored organization-wide secure coding standards adopted company-wide",
    ],
  },
  {
    id: 3,
    organization: "Earlier Role",
    role: "Junior Security Analyst",
    period: "2019 — 2020",
    location: "Cameroon",
    highlights: [
      "Performed vulnerability assessments on internal network infrastructure",
      "Supported red team exercises and wrote detailed remediation reports",
    ],
  },
];
