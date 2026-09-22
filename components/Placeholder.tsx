import Link from "next/link";

export default function Placeholder({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{eyebrow}</span>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950">{title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[["Primary view","Main content area is reserved for the detailed spec."],["Secondary data","Cards, filters, and supporting information will land here."],["Next interaction","Client-side behavior will be added only where required."]].map(([heading, copy]) => (
          <div key={heading} className="min-h-40 rounded-2xl border border-dashed border-slate-300 bg-white p-5">
            <div className="mb-8 h-2 w-12 rounded-full bg-brand-500/20" />
            <h2 className="font-bold text-slate-900">{heading}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">Back home</Link>
        <Link href="/health-check" className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Check deployment</Link>
      </div>
    </div>
  );
}
