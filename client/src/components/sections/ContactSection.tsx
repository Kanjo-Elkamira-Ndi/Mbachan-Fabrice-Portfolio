import { FadeInView } from "@/components/animations/FadeInView";
import { Mail, Linkedin, Github } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SUBJECTS = ["Penetration Testing", "DevSecOps", "Incident Response", "Other"];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Message sent. I'll be in touch within 24 hours.");
    setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2">
        <FadeInView>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Let's Work Together</h2>
          <p className="mt-6 text-[--text-secondary] leading-relaxed max-w-md">
            Available for penetration testing engagements, DevSecOps consulting, security
            architecture reviews, and incident response retainers.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-emerald/30 bg-emerald/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald animate-pulse-dot" />
            <span className="text-sm text-emerald">Currently accepting new clients</span>
          </div>

          <div className="mt-10 space-y-4">
            <a
              href="mailto:fabrice@mbachanfabrice.com"
              className="flex items-center gap-3 text-[--text-secondary] hover:text-cyan transition-colors"
            >
              <Mail className="h-4 w-4" /> fabrice@mbachanfabrice.com
            </a>
            <a
              href="https://linkedin.com/in/mbachanfabrice"
              className="flex items-center gap-3 text-[--text-secondary] hover:text-cyan transition-colors"
            >
              <Linkedin className="h-4 w-4" /> linkedin.com/in/mbachanfabrice
            </a>
            <a
              href="https://github.com/mbachanfabrice"
              className="flex items-center gap-3 text-[--text-secondary] hover:text-cyan transition-colors"
            >
              <Github className="h-4 w-4" /> github.com/mbachanfabrice
            </a>
          </div>

          <p className="mt-10 font-mono text-xs text-[--text-muted] break-all">
            PGP: XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <form
            onSubmit={submit}
            className="rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-8 space-y-5"
          >
            <Field label="Full Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Your name"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Subject">
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="input"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Message">
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input resize-none"
                placeholder="Tell me about your engagement..."
              />
            </Field>
            <button
              type="submit"
              className="w-full rounded-md bg-[--accent-cyan] py-3 font-medium text-[--bg-primary] hover:glow-cyan-strong transition-shadow"
            >
              Send Message
            </button>
          </form>
        </FadeInView>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-2">
        {label}
      </span>
      {children}
      <style>{`
        .input {
          width: 100%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-soft);
          border-radius: 6px;
          padding: 10px 14px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.15);
        }
      `}</style>
    </label>
  );
}
