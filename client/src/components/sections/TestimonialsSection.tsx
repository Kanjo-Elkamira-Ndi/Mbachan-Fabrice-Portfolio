import { FadeInView } from "@/components/animations/FadeInView";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="relative py-32 bg-[--bg-secondary]/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <h2 className="text-center font-display text-4xl md:text-5xl font-bold">What People Say</h2>
        </FadeInView>
      </div>

      <div className="mt-16 overflow-hidden marquee-mask">
        <div className="flex gap-6 animate-marquee w-max">
          {loop.map((t, i) => (
            <article
              key={i}
              className="relative w-[360px] md:w-[420px] flex-shrink-0 rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-6"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)" }}
              />
              <Quote className="h-8 w-8 text-cyan/30" />
              <p className="mt-3 italic text-[--text-secondary] leading-relaxed">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-semibold text-[--text-primary]">{t.author}</div>
                  <div className="text-xs text-[--text-secondary]">
                    {t.role} · {t.organization}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
