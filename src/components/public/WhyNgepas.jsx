/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : WhyNgepas.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

import { BadgeCheck, Wallet, Clock3, ShieldCheck } from "lucide-react";
import whyNgepas from "../../data/whyNgepas";

/*==================================================
 COMPONENT
==================================================*/

function WhyNgepas() {
  return (
    /*==================================================
      WHY NGEPAS SECTION
    ==================================================*/

    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Heading */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">Kenapa Ngepas?</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Alasan kenapa banyak orang memilih Ngepas.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {whyNgepas.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={24} />
              </div>

              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhyNgepas;
