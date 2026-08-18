/*==================================================
 NGEPAS REBORN
 File    : AdminDataState.jsx
 Module  : Admin Components
 Intent  : State surface untuk loading, error, dan empty
           pada data admin tanpa memegang fetch atau aksi bisnis.
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";

/*==================================================
 STATE CONTRACT
==================================================*/

const stateConfig = {
  loading: {
    icon: LoaderCircle,
    iconClassName:
      "animate-spin motion-reduce:animate-none text-[var(--np-color-action-primary)]",
    surfaceClassName:
      "border-[var(--np-color-border)] bg-[var(--np-color-surface)]",
  },
  error: {
    icon: AlertCircle,
    iconClassName: "text-[var(--np-color-danger)]",
    surfaceClassName:
      "border-[var(--np-color-danger)] bg-[var(--np-color-danger-soft)]",
  },
  empty: {
    icon: Inbox,
    iconClassName: "text-[var(--np-color-text-secondary)]",
    surfaceClassName:
      "border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)]",
  },
};

/*==================================================
 COMPONENT
==================================================*/

function AdminDataState({ state = "empty", title, description }) {
  const config = stateConfig[state] || stateConfig.empty;
  const Icon = config.icon;
  const isError = state === "error";

  return (
    <section
      className={`flex flex-col items-start gap-[var(--np-space-3)] rounded-[var(--np-radius-lg)] border p-[var(--np-space-6)] shadow-[var(--np-shadow-sm)] ${config.surfaceClassName}`}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <Icon className={config.iconClassName} size={24} aria-hidden="true" />
      <div>
        <h2 className="text-[var(--np-text-h3)] font-semibold text-[var(--np-color-text-primary)]">
          {title}
        </h2>
        <p className="mt-[var(--np-space-1)] text-[var(--np-text-small)] leading-[var(--np-leading-body)] text-[var(--np-color-text-secondary)]">
          {description}
        </p>
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default AdminDataState;
