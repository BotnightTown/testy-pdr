"use client";

import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import { useDrivingCategorySettings } from "@/hooks/useDrivingCategorySettings";
import { getQuestionThemesByCategories } from "@/lib/quiz-service";

export default function TopicsPage() {
  const [selectedCategoryIds] = useDrivingCategorySettings();
  const themes = getQuestionThemesByCategories(selectedCategoryIds);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="font-medium text-slate-500 dark:text-slate-400 transition-colors hover:text-slate-800 dark:hover:text-slate-200"
          >
            ← На головну
          </Link>
          <Link
            href="/settings"
            className="font-bold text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300"
          >
            Налаштування категорій
          </Link>
        </nav>

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Питання по темах
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Оберіть тему для початку тренування
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <QuizCard
              key={theme.id}
              id={theme.id}
              title={theme.title}
              questionCount={theme.questionCount}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
