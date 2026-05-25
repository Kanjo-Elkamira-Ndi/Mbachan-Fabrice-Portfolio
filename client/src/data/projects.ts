import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Financial Platform Security Audit",
    category: "Web Application Pentest",
    confidential: true,
    challenge:
      "A Cameroonian fintech handling mobile money transactions needed a full security assessment before a major product launch.",
    outcome:
      "Identified 14 critical and high-severity vulnerabilities including SQL injection, broken authentication, and insecure direct object references.",
    metrics: ["14 critical vulns", "Attack surface reduced 60%", "0-day window closed"],
    technologies: ["Burp Suite", "OWASP ZAP", "SQLMap", "Python"],
  },
  {
    id: 2,
    title: "CI/CD Pipeline Security Hardening",
    category: "DevSecOps",
    confidential: true,
    challenge:
      "An e-commerce startup was shipping code with no security scanning in their deployment pipeline, exposing production to unvetted dependencies.",
    outcome:
      "Designed and implemented a full DevSecOps pipeline with SAST, dependency scanning, container image scanning, and secrets detection.",
    metrics: ["100% pipeline coverage", "Vuln detection shift-left", "3 critical secrets found pre-deploy"],
    technologies: ["GitHub Actions", "SonarQube", "Trivy", "Semgrep", "Docker"],
  },
  {
    id: 3,
    title: "Malware Incident Response",
    category: "Incident Response",
    confidential: true,
    challenge:
      "A regional enterprise discovered unusual outbound traffic patterns suggesting an active compromise. Full containment and forensic analysis required.",
    outcome:
      "Identified a RAT deployed via phishing. Contained the breach within 4 hours, recovered all systems, and delivered a full post-incident report.",
    metrics: ["4hr containment", "0 data exfiltration confirmed", "Root cause identified"],
    technologies: ["Wireshark", "Volatility", "YARA", "Splunk", "Any.run"],
  },
];
