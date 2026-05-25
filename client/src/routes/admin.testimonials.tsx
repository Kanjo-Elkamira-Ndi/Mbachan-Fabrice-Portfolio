import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { ResourceCrud, Field, inputCls } from "@/components/admin/ResourceCrud";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

const blank: Omit<Testimonial, "id"> = {
  quote: "", author: "", role: "", organization: "", initials: "", color: "#7C3AED",
};

function AdminTestimonials() {
  return (
    <AdminShell title="Testimonials">
      <ResourceCrud<Testimonial>
        initialItems={testimonials}
        blank={blank}
        addLabel="Add Testimonial"
        columns={[
          { key: "author", label: "Author" },
          { key: "role", label: "Role" },
          { key: "organization", label: "Organization" },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Quote"><textarea rows={4} className={inputCls} value={s.quote} onChange={(e) => set({ ...s, quote: e.target.value })} /></Field>
            <Field label="Author"><input className={inputCls} value={s.author} onChange={(e) => set({ ...s, author: e.target.value })} /></Field>
            <Field label="Role"><input className={inputCls} value={s.role} onChange={(e) => set({ ...s, role: e.target.value })} /></Field>
            <Field label="Organization"><input className={inputCls} value={s.organization} onChange={(e) => set({ ...s, organization: e.target.value })} /></Field>
            <Field label="Initials"><input className={inputCls} value={s.initials} onChange={(e) => set({ ...s, initials: e.target.value })} /></Field>
            <Field label="Avatar color (hex)"><input className={inputCls} value={s.color} onChange={(e) => set({ ...s, color: e.target.value })} /></Field>
          </>
        )}
      />
    </AdminShell>
  );
}
