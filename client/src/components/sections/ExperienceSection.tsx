import { FadeInView } from "@/components/animations/FadeInView";
import { Check } from "lucide-react";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="font-mono text-xs text-cyan">// career_timeline</p>
          <h2 className="mt-3 text-center font-display text-4xl md:text-5xl font-bold">Professional Experience</h2>
        </FadeInView>

        <div className="relative mt-20">
          {/* center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[--accent-cyan]/40 glow-cyan" />

          <div className="space-y-16">
            {experience.map((item, idx) => {
              const right = idx % 2 === 1;
              return (
                <FadeInView key={item.id}>
                  <div className="relative grid md:grid-cols-2 gap-8 items-start">
                    {/* dot */}
                    <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-[--accent-cyan] ring-2 ring-[--bg-primary] glow-cyan" />

                    <div className={`pl-12 md:pl-0 ${right ? "md:order-2 md:pl-16" : "md:pr-16 md:text-right"}`}>
                      <div className="font-mono text-xs text-cyan">{item.period}</div>
                      <h3 className="mt-2 font-display text-xl font-semibold">{item.organization}</h3>
                      <p className="mt-1 text-sm text-[--text-secondary]">{item.role}</p>
                      <p className="mt-1 text-xs text-[--text-muted]">{item.location}</p>
                    </div>

                    <div className={`pl-12 md:pl-0 ${right ? "md:order-1 md:pr-16" : "md:pl-16"}`}>
                      <div className="rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-5">
                        <ul className="space-y-3">
                          {item.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm text-[--text-secondary]">
                              <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeInView>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
