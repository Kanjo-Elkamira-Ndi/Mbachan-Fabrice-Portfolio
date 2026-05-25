import type { Message } from "@/types";

export const initialMessages: Message[] = [
  {
    id: 1,
    name: "Sarah Kouam",
    email: "sarah@fintechco.cm",
    subject: "Penetration Testing",
    message:
      "Hi Fabrice, we're launching a new mobile money product in Q3 and would love to schedule a full pentest engagement. Are you available for a discovery call next week?",
    date: "2025-05-22",
    read: false,
  },
  {
    id: 2,
    name: "Marc Etienne",
    email: "marc@cloudscale.io",
    subject: "DevSecOps",
    message:
      "Our team needs help integrating security scanning into our GitHub Actions pipelines. Looking at a 4-6 week engagement.",
    date: "2025-05-20",
    read: false,
  },
  {
    id: 3,
    name: "Aisha Bello",
    email: "aisha@enterprise.ng",
    subject: "Incident Response",
    message:
      "We had a suspected breach last night. Need urgent help with containment and forensics. Please respond ASAP.",
    date: "2025-05-18",
    read: true,
  },
];
