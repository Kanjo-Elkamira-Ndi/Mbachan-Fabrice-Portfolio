import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Shield } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success("Authenticated.");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--bg-primary] px-4">
      <div className="w-full max-w-md rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-8">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-cyan" />
          <h1 className="font-display text-2xl font-bold">Admin Console</h1>
        </div>
        <p className="font-mono text-xs text-[--text-muted] mb-6">
          &gt; Authentication required — clearance level: EXPERT
        </p>
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="block font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-2">
              Email
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              className="w-full bg-[--bg-tertiary] border border-[--border-soft] rounded-md px-3 py-2 text-sm outline-none focus:border-[--accent-cyan]"
              placeholder="admin@mbachanfabrice.com"
            />
          </label>
          <label className="block">
            <span className="block font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-2">
              Password
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="w-full bg-[--bg-tertiary] border border-[--border-soft] rounded-md px-3 py-2 text-sm outline-none focus:border-[--accent-cyan]"
            />
          </label>
          <button className="w-full rounded-md bg-[--accent-cyan] py-3 text-sm font-medium text-[--bg-primary] hover:glow-cyan-strong transition-shadow">
            Authenticate
          </button>
        </form>
        <p className="mt-6 font-mono text-[10px] text-[--text-muted]">
          // V1 mock credentials — replaced by JWT in V2
        </p>
      </div>
    </div>
  );
}
