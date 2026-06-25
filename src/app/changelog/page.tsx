import Link from "next/link";
import { CHANGELOG, TYPE_LABELS, TYPE_STYLES } from "@/data/changelog";

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <nav className="mb-6">
          <Link
            href="/"
            className="font-medium text-slate-500 transition-colors hover:text-slate-800"
          >
            ← На головну
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Що нового
          </h1>
          <p className="mt-1 text-slate-500">Історія оновлень застосунку</p>
        </header>

        <div className="flex flex-col gap-6">
          {CHANGELOG.map((entry, i) => (
            <div
              key={entry.version}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {i === 0 && (
                    <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                      Поточна
                    </span>
                  )}
                  <span className="text-lg font-bold text-slate-900">
                    v{entry.version}
                  </span>
                </div>
                <span className="text-sm text-slate-400">{entry.date}</span>
              </div>

              <ul className="flex flex-col gap-2">
                {entry.changes.map((change, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold ${TYPE_STYLES[change.type]}`}
                    >
                      {TYPE_LABELS[change.type]}
                    </span>
                    <span className="text-sm text-slate-700">
                      {change.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
