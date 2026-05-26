import { FadeInView } from "@/components/animations/FadeInView";
import portrait from "@/assets/hero.png";

const STATS = [
  ["5+", "Years"],
  ["50+", "Systems"],
  ["3", "Certs"],
];

const BADGES = ["Penetration Testing", "DevSecOps", "Threat Intelligence", "Malware Analysis"];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 md:grid-cols-12 items-start">
        <FadeInView className="md:col-span-5">
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                transform: "rotate(-2deg)",
                border: "1px solid var(--border-accent)",
                boxShadow: "0 0 60px rgba(0,229,255,0.12)",
              }}
            >
              <img
                src={portrait}
                alt="Mbachan Fabrice portrait"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[--bg-primary]/40 via-transparent to-[--accent-cyan]/5" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {STATS.map(([n, l]) => (
              <div
                key={l}
                className="rounded-md bg-[--bg-tertiary] p-4 border-t-2 border-[--accent-cyan] text-center"
              >
                <div className="font-display text-2xl font-bold text-[--text-primary]">{n}</div>
                <div className="mt-1 text-xs text-[--text-secondary]">{l}</div>
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView className="md:col-span-7" delay={0.1}>
          <p className="font-mono text-xs text-cyan">// about.me</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Defender by Design.</h2>

          <p className="mt-6 text-[--text-secondary] leading-relaxed">
            Mbachan Fabrice is a Cybersecurity Engineer and DevSecOps Specialist with over 5 years
            of experience securing infrastructure, conducting penetration tests, and building
            security into the software development lifecycle.
          </p>
          <p className="mt-4 text-[--text-secondary] leading-relaxed">
            Passionate about the intersection of offensive and defensive security, he combines deep
            technical knowledge with a consulting mindset — translating complex vulnerabilities into
            clear business risk and actionable solutions.
          </p>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-[--text-muted]">
            Security Philosophy
          </p>
          <blockquote className="mt-3 border-l-2 border-[--accent-cyan] pl-5 font-display italic text-lg text-[--text-primary]">
            "Security is not a product, it is a process — and that process must be embedded from the
            first line of code."
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-[--border-accent] bg-[--bg-secondary] px-4 py-1.5 text-xs text-cyan"
              >
                {b}
              </span>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
