import { FadeInView, staggerContainer, staggerItem } from "@/components/animations/FadeInView";
import { motion } from "framer-motion";
import { ShieldAlert, GitBranch, Code2, Bug, Radar, Siren } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldAlert,
    title: "Penetration Testing",
    desc: "Web app, API, and network penetration testing using industry-standard methodologies (OWASP, PTES).",
    tags: ["Burp Suite", "Metasploit", "Kali Linux", "OWASP"],
  },
  {
    icon: GitBranch,
    title: "DevSecOps Engineering",
    desc: "Embedding security controls into CI/CD pipelines, container hardening, and infrastructure-as-code security.",
    tags: ["Docker", "GitHub Actions", "Kubernetes", "Terraform"],
  },
  {
    icon: Code2,
    title: "Secure Code Review",
    desc: "Manual and automated review of application source code to identify logic flaws, injection vulnerabilities, and insecure patterns.",
    tags: ["SAST", "SonarQube", "Semgrep", "Python"],
  },
  {
    icon: Bug,
    title: "Malware Analysis",
    desc: "Static and dynamic analysis of malicious software to understand behavior, persistence mechanisms, and indicators of compromise.",
    tags: ["Ghidra", "Any.run", "YARA", "Sandbox"],
  },
  {
    icon: Radar,
    title: "Threat Intelligence",
    desc: "Collection, analysis, and operationalization of threat data to anticipate and mitigate emerging attack vectors.",
    tags: ["MITRE ATT&CK", "OpenCTI", "OSINT", "STIX"],
  },
  {
    icon: Siren,
    title: "Incident Response",
    desc: "Rapid containment, eradication, and recovery from security breaches, with detailed post-incident reporting.",
    tags: ["Splunk", "Wireshark", "Volatility", "SIEM"],
  },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="font-mono text-xs text-cyan">// what_i_do</p>
          <h2 className="mt-3 text-center font-display text-4xl md:text-5xl font-bold">
            Areas of Expertise
          </h2>
        </FadeInView>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ITEMS.map(({ icon: Icon, title, desc, tags }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="group rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-6 transition-all hover:border-[--border-accent] hover:glow-cyan"
            >
              <Icon className="h-8 w-8 text-cyan" />
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-[--text-secondary] leading-relaxed">{desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[--bg-tertiary] px-3 py-1 text-xs text-[--text-secondary]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
