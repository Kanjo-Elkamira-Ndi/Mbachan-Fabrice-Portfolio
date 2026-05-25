import { FadeInView, staggerContainer, staggerItem } from "@/components/animations/FadeInView";
import { motion } from "framer-motion";
import { technologies } from "@/data/technologies";

export function TechStackSection() {
  return (
    <section className="relative py-32 bg-[--bg-secondary]/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="font-mono text-xs text-cyan">// tech_arsenal</p>
          <h2 className="mt-3 text-center font-display text-4xl md:text-5xl font-bold">
            Tools of the Trade
          </h2>
        </FadeInView>

        <div className="mt-16 space-y-10">
          {technologies.map((group) => (
            <FadeInView key={group.id}>
              <p className="font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-4">
                {group.category}
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="flex flex-wrap gap-3"
              >
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-md border border-[--border-soft] bg-[--bg-tertiary] px-4 py-2 text-sm text-[--text-primary] hover:border-[--border-accent] hover:glow-cyan transition-all cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
