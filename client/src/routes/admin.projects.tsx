import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { ResourceCrud, Field, inputCls } from "@/components/admin/ResourceCrud";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
});

const blank: Omit<Project, "id"> = {
  title: "", category: "", confidential: true, challenge: "", outcome: "", metrics: [], technologies: [],
};

function AdminProjects() {
  return (
    <AdminShell title="Case Studies">
      <ResourceCrud<Project>
        initialItems={projects}
        blank={blank}
        addLabel="Add Project"
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "confidential", label: "Confidential", render: (r) => r.confidential ? "Yes" : "No" },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Title"><input className={inputCls} value={s.title} onChange={(e) => set({ ...s, title: e.target.value })} /></Field>
            <Field label="Category"><input className={inputCls} value={s.category} onChange={(e) => set({ ...s, category: e.target.value })} /></Field>
            <Field label="Challenge"><textarea rows={3} className={inputCls} value={s.challenge} onChange={(e) => set({ ...s, challenge: e.target.value })} /></Field>
            <Field label="Outcome"><textarea rows={3} className={inputCls} value={s.outcome} onChange={(e) => set({ ...s, outcome: e.target.value })} /></Field>
            <Field label="Metrics (comma separated)">
              <input className={inputCls} value={s.metrics.join(", ")} onChange={(e) => set({ ...s, metrics: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} />
            </Field>
            <Field label="Technologies (comma separated)">
              <input className={inputCls} value={s.technologies.join(", ")} onChange={(e) => set({ ...s, technologies: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={s.confidential} onChange={(e) => set({ ...s, confidential: e.target.checked })} />
              Mark as confidential
            </label>
          </>
        )}
      />
    </AdminShell>
  );
}
