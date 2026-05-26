import { AdminShell } from "@/components/admin/AdminShell";
import { ResourceCrud, Field, inputCls } from "@/components/admin/RecourceCrud";
import { technologies } from "@/data/technologies";
import type { TechGroup } from "@/types";

const blank: Omit<TechGroup, "id"> = { category: "", items: [] };

export default function AdminTechStack() {
  return (
    <AdminShell title="Tech Stack">
      <ResourceCrud<TechGroup>
        initialItems={technologies}
        blank={blank}
        addLabel="Add Group"
        columns={[
          { key: "category", label: "Category" },
          { key: "items", label: "Items", render: (r) => r.items.join(", ") },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Category">
              <input
                className={inputCls}
                value={s.category}
                onChange={(e) => set({ ...s, category: e.target.value })}
              />
            </Field>
            <Field label="Items (comma separated)">
              <input
                className={inputCls}
                value={s.items.join(", ")}
                onChange={(e) =>
                  set({
                    ...s,
                    items: e.target.value
                      .split(",")
                      .map((x) => x.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
          </>
        )}
      />
    </AdminShell>
  );
}
