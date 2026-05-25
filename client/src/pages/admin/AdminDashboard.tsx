import { Link } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { initialMessages } from "@/data/messages";
import { Briefcase, Award, ListChecks, Inbox } from "lucide-react";

export default function AdminDashboard() {
  const unread = initialMessages.filter((m) => !m.read).length;
  const stats = [
    { icon: Briefcase, label: "Total Projects", value: projects.length, color: "text-cyan" },
    {
      icon: Award,
      label: "Total Certifications",
      value: certifications.length,
      color: "text-[--accent-emerald]",
    },
    {
      icon: ListChecks,
      label: "Experience Entries",
      value: experience.length,
      color: "text-[--accent-purple]",
    },
    { icon: Inbox, label: "Unread Messages", value: unread, color: "text-[--destructive]" },
  ];
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-5"
          >
            <div className="flex items-center justify-between">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <span className="font-display text-3xl font-bold">{s.value}</span>
            </div>
            <p className="mt-3 text-sm text-[--text-secondary]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-6">
          <h2 className="font-display text-lg font-semibold mb-4">Recent Messages</h2>
          <div className="space-y-3">
            {initialMessages.slice(0, 3).map((m) => (
              <div
                key={m.id}
                className="rounded-md border border-[--border-soft] p-4 hover:border-[--border-accent]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{m.name}</span>
                  <span className="font-mono text-xs text-[--text-muted]">{m.date}</span>
                </div>
                <p className="mt-1 text-xs text-cyan">{m.subject}</p>
                <p className="mt-2 text-sm text-[--text-secondary] line-clamp-2">{m.message}</p>
              </div>
            ))}
          </div>
          <Link
            to="/admin/messages"
            className="mt-4 inline-block text-sm text-cyan hover:underline"
          >
            View all messages →
          </Link>
        </div>

        <div className="rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-6">
          <h2 className="font-display text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { to: "/admin/projects", label: "Manage Projects" },
              { to: "/admin/certifications", label: "Manage Certifications" },
              { to: "/admin/experience", label: "Edit Experience" },
              { to: "/admin/testimonials", label: "Edit Testimonials" },
            ].map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="block rounded-md border border-[--border-soft] px-4 py-2 text-sm hover:border-[--border-accent] hover:text-cyan"
              >
                {q.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
