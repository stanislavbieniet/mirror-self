"use client";

export default function SupportContacts() {
  return (
    <section className="relative isolate bg-slate-950 px-6 py-28 text-slate-200">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800/70 bg-slate-950/60 p-10 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Support
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-slate-100">
          If you need support, help is available.
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          If this project brought something up for you, you don’t have to handle it alone.
          Talking to someone can help — whether that’s a professional, a volunteer,
          or someone you trust.
        </p>

        <div className="mt-8 space-y-4 text-sm text-slate-300">
          <div>
            <p className="font-medium text-slate-100">Worldwide</p>
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              findahelpline.com
            </a>
          </div>

          <div>
            <p className="font-medium text-slate-100">United Kingdom</p>
            <p>Samaritans — 116 123 (24/7)</p>
            <a
              href="https://www.nhs.uk/urgentmentalhealth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              NHS urgent mental health services
            </a>
          </div>

          <div className="pt-4 text-slate-400 text-xs">
            If you are in immediate danger, contact your local emergency number.
          </div>
        </div>
      </div>
    </section>
  );
}
