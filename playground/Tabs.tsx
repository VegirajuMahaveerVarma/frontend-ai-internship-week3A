"use client";
import { useId, useState } from "react";

type Tab = { id: string; label: string; content: React.ReactNode };
type TabsProps = { tabs: readonly Tab[] };

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Playground tabs" className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${baseId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
            className={`rounded-t-lg px-4 py-2 text-sm font-semibold ${active === index ? "bg-brand-50 text-brand-600" : "text-slate-500"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div key={tab.id} id={`${baseId}-panel-${index}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${index}`} hidden={active !== index} tabIndex={0} className="rounded-b-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          {tab.content}
        </div>
      ))}
    </div>
  );
}