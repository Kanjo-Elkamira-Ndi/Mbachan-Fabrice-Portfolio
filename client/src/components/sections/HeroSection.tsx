import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ParticleCanvas } from "@/components/animations/ParticleCanvas";

const headline = ["Securing", "the", "Digital", "Frontier."];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <ParticleCanvas />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24">
        <div className="w-full md:w-[55%]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm text-cyan"
          >
            &gt; Cybersecurity Engineer &amp; DevSecOps Specialist
          </motion.p>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] text-[--text-primary]">
            {headline.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                className="inline-block mr-3"
              >
                {i === 2 ? <span className="text-cyan">{w}</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-[480px] text-lg text-[--text-secondary]"
          >
            I help organizations defend their infrastructure through offensive security,
            secure engineering, and intelligent threat response. Based in Cameroon,
            operating globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-md bg-[--accent-cyan] px-6 py-3 font-medium text-[--bg-primary] hover:glow-cyan-strong transition-shadow"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-md border border-[--accent-cyan] px-6 py-3 font-medium text-cyan hover:bg-[--accent-cyan]/10 transition-colors"
            >
              Book Consultation
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {["5+ Years Experience", "50+ Systems Secured", "DevSecOps Certified"].map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 rounded-full border border-[--border-soft] bg-[--bg-secondary]/60 backdrop-blur px-4 py-2 text-xs text-[--text-secondary]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[--accent-cyan] glow-cyan" />
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
}
