import { FadeInView, staggerContainer, staggerItem } from "@/components/animations/FadeInView";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export function CaseStudiesSection() {
  return (
    <section id="work" className="relative py-32 bg-[--bg-secondary]/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="font-mono text-xs text-cyan">// selected_work</p>
          <h2 className="mt-3 text-center font-display text-4xl md:text-5xl font-bold">Case Studies</h2>
          <p className="mt-3 text-center text-[--text-secondary]">Sanitized extracts from real engagements</p>
        </FadeInView>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.article
              key={p.id}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-6 transition-all hover:border-[--border-accent] hover:glow-cyan"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)" }}
              />
              {p.confidential && (
                <span className="absolute top-4 right-4 rounded-full border border-[--destructive]/40 bg-[--destructive]/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-[--destructive]">
                  CONFIDENTIAL
                </span>
              )}

              <span className="self-start rounded-full border border-[--border-accent] bg-[--accent-cyan]/5 px-3 py-1 text-xs text-cyan">
                {p.category}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{p.title}</h3>

              <p className="mt-4 text-xs font-mono uppercase tracking-widest text-[--text-muted]">Challenge</p>
              <p className="mt-1 text-sm text-[--text-secondary] leading-relaxed">{p.challenge}</p>

              <p className="mt-4 text-xs font-mono uppercase tracking-widest text-[--text-muted]">Outcome</p>
              <p className="mt-1 text-sm text-[--text-secondary] leading-relaxed">{p.outcome}</p>

              <div className="mt-4 space-y-1">
                {p.metrics.map((m) => (
                  <div key={m} className="text-sm text-emerald font-medium">• {m}</div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[--border-soft]">
                {p.technologies.map((t) => (
                  <span key={t} className="rounded bg-[--bg-tertiary] px-2 py-1 text-xs text-[--text-secondary]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
