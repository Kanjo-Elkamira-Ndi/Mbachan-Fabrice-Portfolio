import type { TechGroup } from "@/types";

export const technologies: TechGroup[] = [
  {
    id: 1,
    category: "Offensive Security",
    items: ["Kali Linux", "Burp Suite", "Metasploit", "Nmap", "Wireshark", "Gobuster", "Nikto"],
  },
  {
    id: 2,
    category: "Secure Engineering",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "SonarQube", "Semgrep"],
  },
  {
    id: 3,
    category: "Languages & Platforms",
    items: ["Python", "Bash", "Node.js", "PostgreSQL", "AWS", "Linux", "Git"],
  },
];
