import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Briefcase,
  Award,
  ListChecks,
  Cpu,
  MessageSquareQuote,
  Inbox,
  LogOut,
  Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/certifications", label: "Certifications", icon: Award },
  { to: "/admin/experience", label: "Experience", icon: ListChecks },
  { to: "/admin/tech-stack", label: "Tech Stack", icon: Cpu },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
];

export function AdminShell({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[--bg-primary] flex">
      <aside className="w-60 flex-shrink-0 border-r border-[--border-soft] bg-[--bg-secondary] flex flex-col">
        <div className="px-6 py-6 border-b border-[--border-soft] flex items-center gap-2">
          <Shield className="h-5 w-5 text-cyan" />
          <span className="font-display font-bold">Admin Console</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[--accent-cyan]/10 text-cyan border border-[--border-accent]"
                    : "text-[--text-secondary] hover:bg-[--bg-tertiary] hover:text-[--text-primary]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
          className="m-3 flex items-center gap-2 rounded-md border border-[--border-soft] px-3 py-2 text-sm text-[--text-secondary] hover:text-[--destructive] hover:border-[--destructive]/40"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <header className="border-b border-[--border-soft] bg-[--bg-secondary]/40 backdrop-blur px-8 py-5 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <div>{action}</div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
