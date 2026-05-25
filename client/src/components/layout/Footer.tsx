import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[--border-soft] bg-[--bg-secondary]">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-extrabold text-cyan">MF</span>
            <span className="font-body text-sm text-[--text-secondary]">Mbachan Fabrice</span>
          </div>
          <p className="mt-4 text-sm text-[--text-secondary] max-w-xs">
            Cybersecurity Engineer & DevSecOps Specialist. Securing the digital frontier.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm text-[--text-primary] mb-3">Connect</h4>
          <div className="flex gap-3">
            <a href="mailto:fabrice@mbachanfabrice.com" className="rounded-md border border-[--border-soft] p-2 text-[--text-secondary] hover:text-cyan hover:border-[--border-accent] transition-colors"><Mail className="h-4 w-4" /></a>
            <a href="https://linkedin.com/in/mbachanfabrice" className="rounded-md border border-[--border-soft] p-2 text-[--text-secondary] hover:text-cyan hover:border-[--border-accent] transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="https://github.com/mbachanfabrice" className="rounded-md border border-[--border-soft] p-2 text-[--text-secondary] hover:text-cyan hover:border-[--border-accent] transition-colors"><Github className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm text-[--text-primary] mb-3">PGP Fingerprint</h4>
          <p className="font-mono text-xs text-[--text-muted] break-all">
            XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX
          </p>
          <p className="mt-6 font-mono text-xs italic text-[--text-muted]">
            "Trust, but verify. Always verify."
          </p>
        </div>
      </div>
      <div className="border-t border-[--border-soft] px-6 py-4 text-center font-mono text-xs text-[--text-muted]">
        © {new Date().getFullYear()} Mbachan Fabrice — All systems nominal.
      </div>
    </footer>
  );
}
