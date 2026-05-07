"use client";

import { useRouter } from "next/navigation";

export default function RandomQuizCard() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/quiz/random-${Date.now()}`)}
      className="group flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-blue-400 hover:shadow-sm"
    >
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-lg font-extrabold text-blue-600 transition-colors group-hover:bg-blue-100">
          20
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          20 випадкових питань
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Швидке тренування з питань усіх тем.
        </p>
      </div>
      <span className="mt-8 text-sm font-bold text-blue-600">
        Почати тестування
      </span>
    </button>
  );
}
