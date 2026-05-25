import { useMemo, useState, type ReactNode } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
}

export interface ResourceCrudProps<T extends { id: number }> {
  initialItems: T[];
  blank: Omit<T, "id">;
  columns: Column<T>[];
  renderForm: (state: Omit<T, "id">, setState: (s: Omit<T, "id">) => void) => ReactNode;
  addLabel: string;
}

export function ResourceCrud<T extends { id: number }>({
  initialItems,
  blank,
  columns,
  renderForm,
  addLabel,
}: ResourceCrudProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<T, "id">>(blank);

  const nextId = useMemo(() => items.reduce((m, i) => Math.max(m, i.id), 0) + 1, [items]);

  const openCreate = () => {
    setForm(blank);
    setCreating(true);
  };
  const openEdit = (row: T) => {
    const { id: _id, ...rest } = row;
    setForm(rest as Omit<T, "id">);
    setEditing(row);
  };
  const close = () => {
    setCreating(false);
    setEditing(null);
  };

  const save = () => {
    if (editing) {
      setItems((cur) =>
        cur.map((i) => (i.id === editing.id ? ({ ...form, id: editing.id } as T) : i)),
      );
    } else {
      setItems((cur) => [...cur, { ...form, id: nextId } as T]);
    }
    close();
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md bg-[--accent-cyan] px-4 py-2 text-sm font-medium text-[--bg-primary]"
        >
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      </div>

      <div className="rounded-lg border border-[--border-soft] bg-[--bg-secondary] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[--bg-tertiary] text-left">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[--text-muted]"
                >
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-mono text-xs uppercase tracking-wider text-[--text-muted]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[--border-soft] hover:bg-[--bg-tertiary]/40"
              >
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-4 py-3 text-[--text-secondary]">
                    {c.render
                      ? c.render(row)
                      : String((row as Record<string, unknown>)[c.key as string] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(row)}
                      className="rounded-md border border-[--border-soft] p-1.5 hover:border-[--border-accent] hover:text-cyan"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmId(row.id)}
                      className="rounded-md border border-[--border-soft] p-1.5 hover:border-[--destructive] hover:text-[--destructive]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-[--text-muted]"
                >
                  No entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <Modal onClose={close} title={editing ? "Edit entry" : addLabel}>
          <div className="space-y-4">{renderForm(form, setForm)}</div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={close}
              className="rounded-md border border-[--border-soft] px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="rounded-md bg-[--accent-cyan] px-4 py-2 text-sm font-medium text-[--bg-primary]"
            >
              {editing ? "Save changes" : "Create"}
            </button>
          </div>
        </Modal>
      )}

      {confirmId !== null && (
        <Modal onClose={() => setConfirmId(null)} title="Delete entry?">
          <p className="text-sm text-[--text-secondary]">This action cannot be undone.</p>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setConfirmId(null)}
              className="rounded-md border border-[--border-soft] px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setItems((cur) => cur.filter((i) => i.id !== confirmId));
                setConfirmId(null);
              }}
              className="rounded-md bg-[--destructive] px-4 py-2 text-sm font-medium text-white"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({
  children,
  onClose,
  title,
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg border border-[--border-soft] bg-[--bg-secondary] p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full bg-[--bg-tertiary] border border-[--border-soft] rounded-md px-3 py-2 text-sm text-[--text-primary] outline-none focus:border-[--accent-cyan] focus:ring-2 focus:ring-[--accent-cyan]/20";
