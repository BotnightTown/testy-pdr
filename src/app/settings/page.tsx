"use client";

import Link from "next/link";
import { useDrivingCategorySettings } from "@/hooks/useDrivingCategorySettings";
import { getDrivingCategories } from "@/lib/quiz-service";
import { DrivingCategoryId } from "@/types/question.types";

const categories = getDrivingCategories();

export default function SettingsPage() {
  const [selectedCategoryIds, setSelectedCategoryIds] =
    useDrivingCategorySettings();
  const selectedCategories = new Set(selectedCategoryIds);

  const toggleCategory = (categoryId: DrivingCategoryId) => {
    const nextCategories = new Set(selectedCategoryIds);

    if (nextCategories.has(categoryId)) {
      nextCategories.delete(categoryId);
    } else {
      nextCategories.add(categoryId);
    }

    setSelectedCategoryIds(Array.from(nextCategories));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-8">
          <Link
            href="/"
            className="font-medium text-slate-500 transition-colors hover:text-slate-800"
          >
            ← На головну
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Налаштування
          </h1>
          <p className="mt-2 text-slate-600">
            Базові теми 1-39 завжди включені. Додаткові теми додаються за
            вибраними категоріями.
          </p>
        </header>

        <div className="grid gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategories.has(category.id);

            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex cursor-pointer items-center gap-4 rounded-2xl border bg-white p-5 text-left transition-all ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-bold text-slate-900">
                    Категорія {category.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    {category.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/topics"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center font-bold text-white transition-colors hover:bg-slate-800"
          >
            Перейти до тем
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center font-bold text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            На головну
          </Link>
        </div>
      </div>
    </main>
  );
}
