import { AdminShell } from "@/components/admin/AdminShell";
import { ResourceCrud, Field, inputCls } from "@/components/admin/RecourceCrud";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/types";

const blank: Omit<ExperienceItem, "id"> = {
  organization: "",
  role: "",
  period: "",
  location: "",
  highlights: [],
};

export default function AdminExperience() {
  return (
    <AdminShell title="Experience">
      <ResourceCrud<ExperienceItem>
        initialItems={experience}
        blank={blank}
        addLabel="Add Role"
        columns={[
          { key: "organization", label: "Organization" },
          { key: "role", label: "Role" },
          { key: "period", label: "Period" },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Organization">
              <input
                className={inputCls}
                value={s.organization}
                onChange={(e) => set({ ...s, organization: e.target.value })}
              />
            </Field>
            <Field label="Role">
              <input
                className={inputCls}
                value={s.role}
                onChange={(e) => set({ ...s, role: e.target.value })}
              />
            </Field>
            <Field label="Period">
              <input
                className={inputCls}
                value={s.period}
                onChange={(e) => set({ ...s, period: e.target.value })}
              />
            </Field>
            <Field label="Location">
              <input
                className={inputCls}
                value={s.location}
                onChange={(e) => set({ ...s, location: e.target.value })}
              />
            </Field>
            <Field label="Highlights (one per line)">
              <textarea
                rows={4}
                className={inputCls}
                value={s.highlights.join("\n")}
                onChange={(e) =>
                  set({
                    ...s,
                    highlights: e.target.value
                      .split("\n")
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
