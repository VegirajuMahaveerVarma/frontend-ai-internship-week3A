"use client";
import { useId, useState } from "react";

type DisclosureProps = { title: string; children: React.ReactNode; defaultOpen?: boolean };

export default function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50"
        >
          {title}<span aria-hidden="true" className="text-lg">{open ? "−" : "+"}</span>
        </button>
      </h3>
      <div id={panelId} hidden={!open} className="border-t border-slate-100 px-4 py-3 text-sm leading-6 text-slate-600">
        {children}
      </div>
    </div>
  );
}