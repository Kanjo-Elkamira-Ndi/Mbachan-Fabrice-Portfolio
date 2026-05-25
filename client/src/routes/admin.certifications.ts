import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { ResourceCrud, Field, inputCls } from "@/components/admin/ResourceCrud";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";

export const Route = createFileRoute("/admin/certifications")({
  component: AdminCerts,
});

const blank: Omit<Certification, "id"> = { name: "", issuer: "", year: "", color: "#00E5FF" };

function AdminCerts() {
  return (
    <AdminShell title="Certifications">
      <ResourceCrud<Certification>
        initialItems={certifications}
        blank={blank}
        addLabel="Add Certification"
        columns={[
          { key: "name", label: "Name" },
          { key: "issuer", label: "Issuer" },
          { key: "year", label: "Year" },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Name"><input className={inputCls} value={s.name} onChange={(e) => set({ ...s, name: e.target.value })} /></Field>
            <Field label="Issuer"><input className={inputCls} value={s.issuer} onChange={(e) => set({ ...s, issuer: e.target.value })} /></Field>
            <Field label="Year"><input className={inputCls} value={s.year} onChange={(e) => set({ ...s, year: e.target.value })} /></Field>
            <Field label="Brand color (hex)"><input className={inputCls} value={s.color} onChange={(e) => set({ ...s, color: e.target.value })} /></Field>
          </>
        )}
      />
    </AdminShell>
  );
}
