import Link from "next/link";
import RandomQuizCard from "@/components/RandomQuizCard";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Тестування ПДР
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Оберіть режим тренування
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <RandomQuizCard />

          <Link
            href="/topics"
            className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 transition-all hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-lg font-extrabold text-slate-600 dark:text-slate-400 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                #
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Питання по темах
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Оберіть конкретний розділ правил дорожнього руху.
              </p>
            </div>
            <span className="mt-8 text-sm font-bold text-blue-600 dark:text-blue-400">
              Перейти до тем
            </span>
          </Link>

          <Link
            href="/settings"
            className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 transition-all hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-lg font-extrabold text-slate-600 dark:text-slate-400 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                ⚙
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Налаштування
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Оберіть категорії водіння для навчання.
              </p>
            </div>
            <span className="mt-8 text-sm font-bold text-blue-600 dark:text-blue-400">
              Вибрати категорії
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
