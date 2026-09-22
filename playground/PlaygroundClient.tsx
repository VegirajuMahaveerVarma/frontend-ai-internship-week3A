"use client";
import { useState } from "react";
import Modal from "./Modal";
import Tabs from "./Tabs";
import Disclosure from "./Disclosure";

export default function PlaygroundClient() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">FE-05 Playground</span>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Accessible component fundamentals</h1>
      <p className="mt-4 max-w-2xl text-slate-600">Three interactive widgets implemented from scratch against the WAI-ARIA APG patterns. Test them without a mouse.</p>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Modal dialog</h2>
        <p className="mt-2 text-sm text-slate-500">Focus moves into the dialog, Tab wraps, Escape closes, and focus returns to the trigger.</p>
        <button type="button" onClick={() => setModalOpen(true)} className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Open modal</button>
        <Modal open={modalOpen} title="Keyboard-first dialog" onClose={() => setModalOpen(false)}>
          Use Tab and Shift+Tab to cycle through controls. Press Escape to close the dialog.
          <div className="mt-4 flex gap-2"><button className="rounded-lg border px-3 py-2">Secondary action</button><button className="rounded-lg bg-brand-500 px-3 py-2 text-white" onClick={() => setModalOpen(false)}>Done</button></div>
        </Modal>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-2 text-lg font-bold">Tabs</h2>
        <p className="mb-4 text-sm text-slate-500">Use Left/Right arrows, Home, and End while focused on a tab.</p>
        <Tabs tabs={[
          { id: "overview", label: "Overview", content: "Overview content is exposed through a tabpanel associated with its tab." },
          { id: "implementation", label: "Implementation", content: "Only the active panel is exposed. Inactive panels are hidden." },
          { id: "testing", label: "Testing", content: "Keyboard testing covers ArrowLeft, ArrowRight, Home, End, Enter, and Space." }
        ]} />
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Disclosure</h2>
        <p className="mt-2 mb-4 text-sm text-slate-500">Press Enter or Space on the button to toggle the associated content.</p>
        <Disclosure title="What makes this accessible?" defaultOpen>
          The trigger exposes its expanded state with aria-expanded and references the content with aria-controls. Native button behavior supplies keyboard activation.
        </Disclosure>
      </section>
    </div>
  );
}