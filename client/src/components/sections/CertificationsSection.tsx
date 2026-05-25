import { FadeInView, staggerContainer, staggerItem } from "@/components/animations/FadeInView";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { certifications } from "@/data/certifications";

function initials(name: string) {
  return name
    .replace(/[()]/g, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
}

export function CertificationsSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="font-mono text-xs text-cyan">// credentials</p>
          <h2 className="mt-3 text-center font-display text-4xl md:text-5xl font-bold">
            Certifications &amp; Credentials
          </h2>
        </FadeInView>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((c) => (
            <motion.div
              key={c.id}
              variants={staggerItem}
              className="relative rounded-lg p-6 transition-all hover:glow-cyan"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-display font-bold text-white text-sm"
                  style={{ background: c.color }}
                >
                  {initials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold leading-tight">{c.name}</h3>
                  <p className="mt-1 text-sm text-[--text-secondary]">{c.issuer}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan">{c.year}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald">
                      <Check className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
