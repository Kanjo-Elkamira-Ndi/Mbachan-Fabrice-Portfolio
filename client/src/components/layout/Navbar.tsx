import { useEffect, useState } from "react";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Expertise", id: "expertise" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = "";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 transition-all"
        style={{
          background: scrolled ? "var(--navbar-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--navbar-border)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
          >
            <span className="font-display text-2xl font-extrabold text-cyan">MF</span>
            <span className="hidden sm:inline font-body text-sm text-[--text-secondary]">
              Mbachan Fabrice
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="relative px-4 py-2 text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-1 rounded-full bg-[--accent-cyan] glow-cyan" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-md border border-[--border-soft] p-2 text-[--text-secondary] hover:text-cyan hover:border-[--border-accent] transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-[--border-accent] px-4 py-2 text-sm text-cyan hover:bg-[--accent-cyan]/10 transition-colors">
              <Download className="h-4 w-4" /> Download CV
            </button>
          </div>

          <button
            className="md:hidden text-[--text-primary]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[70] bg-[--bg-primary] md:hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-2xl font-extrabold text-cyan">MF</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="font-display text-3xl text-[--text-primary] hover:text-cyan transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-[--border-soft] px-6 py-3 text-[--text-secondary]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="mt-2 inline-flex items-center gap-2 rounded-md border border-[--border-accent] px-6 py-3 text-cyan">
              <Download className="h-4 w-4" /> Download CV
            </button>
          </div>
        </div>
      )}
    </>
  );
}
