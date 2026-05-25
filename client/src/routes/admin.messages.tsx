import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useState } from "react";
import { initialMessages } from "@/data/messages";
import type { Message } from "@/types";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const [items, setItems] = useState<Message[]>(initialMessages);
  const [open, setOpen] = useState<Message | null>(null);

  const toggleRead = (id: number) =>
    setItems((cur) => cur.map((m) => (m.id === id ? { ...m, read: !m.read } : m)));

  return (
    <AdminShell title="Inbox">
      <div className="rounded-lg border border-[--border-soft] bg-[--bg-secondary] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[--bg-tertiary] text-left">
            <tr>
              {["Name", "Email", "Subject", "Message", "Date", "Status"].map((c) => (
                <th key={c} className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[--text-muted]">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr
                key={m.id}
                onClick={() => setOpen(m)}
                className={`border-t border-[--border-soft] hover:bg-[--bg-tertiary]/40 cursor-pointer ${!m.read ? "bg-[--accent-cyan]/[0.03]" : ""}`}
              >
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-[--text-secondary]">{m.email}</td>
                <td className="px-4 py-3 text-cyan">{m.subject}</td>
                <td className="px-4 py-3 text-[--text-secondary] max-w-xs truncate">{m.message}</td>
                <td className="px-4 py-3 font-mono text-xs text-[--text-muted]">{m.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs ${m.read ? "bg-[--bg-tertiary] text-[--text-muted]" : "bg-[--accent-cyan]/10 text-cyan"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${m.read ? "bg-[--text-muted]" : "bg-[--accent-cyan]"}`} />
                    {m.read ? "Read" : "Unread"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setOpen(null)}>
          <div className="w-full max-w-xl rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold">{open.name}</h3>
                <p className="text-sm text-[--text-secondary]">{open.email}</p>
                <p className="mt-1 font-mono text-xs text-cyan">{open.subject}</p>
              </div>
              <span className="font-mono text-xs text-[--text-muted]">{open.date}</span>
            </div>
            <p className="mt-5 text-sm text-[--text-secondary] leading-relaxed whitespace-pre-wrap">{open.message}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => { toggleRead(open.id); setOpen({ ...open, read: !open.read }); }} className="inline-flex items-center gap-2 rounded-md border border-[--border-soft] px-4 py-2 text-sm">
                <Mail className="h-4 w-4" /> Mark as {open.read ? "Unread" : "Read"}
              </button>
              <button onClick={() => setOpen(null)} className="rounded-md bg-[--accent-cyan] px-4 py-2 text-sm font-medium text-[--bg-primary]">Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
