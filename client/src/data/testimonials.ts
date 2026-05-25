import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Fabrice's penetration test uncovered vulnerabilities our internal team had missed for months. His reports are actionable and his communication is exceptional.",
    author: "Client A",
    role: "CTO",
    organization: "Fintech Startup, Douala",
    initials: "CA",
    color: "#7C3AED",
  },
  {
    id: 2,
    quote:
      "He transformed our deployment process completely. Security went from an afterthought to the first thing our pipeline checks.",
    author: "Client B",
    role: "Engineering Lead",
    organization: "E-commerce Platform",
    initials: "CB",
    color: "#0891B2",
  },
  {
    id: 3,
    quote:
      "Professional, thorough, and deeply knowledgeable. Fabrice handled our incident response with calm precision when we needed it most.",
    author: "Client C",
    role: "IT Director",
    organization: "Regional Enterprise",
    initials: "CC",
    color: "#059669",
  },
];
