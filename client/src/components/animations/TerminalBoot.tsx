import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "> Initializing secure connection...",
  "> Loading clearance level: EXPERT",
  "> Authenticating: Mbachan_Fabrice ████████ OK",
  "> Systems online. Welcome.",
];

const SESSION_KEY = "mf_boot_seen";

export function TerminalBoot() {
  const [show, setShow] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || done) return;
    const current = LINES[lineIdx];
    if (!current) {
      const t = setTimeout(() => setDone(true), 800);
      return () => clearTimeout(t);
    }
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 220);
    return () => clearTimeout(t);
  }, [show, lineIdx, charIdx, done]);

  useEffect(() => {
    if (done) {
      sessionStorage.setItem(SESSION_KEY, "1");
      const t = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(t);
    }
  }, [done]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#080C14" }}
        >
          <div className="font-mono text-sm md:text-base text-cyan max-w-2xl w-full px-6 leading-relaxed">
            {LINES.slice(0, lineIdx).map((l, i) => (
              <div key={i}>{l}</div>
            ))}
            {lineIdx < LINES.length && (
              <div>
                {LINES[lineIdx].slice(0, charIdx)}
                <span className="animate-blink">|</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
