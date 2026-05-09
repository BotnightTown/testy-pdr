"use client";

import Link from "next/link";

export default function RandomQuizCard() {
  return (
    <Link
      href={`/quiz/random-${Date.now()}`}
      className="group flex h-max w-full cursor-pointer flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm items-start gap-1"
    >
      <h2 className="text-xl font-bold text-slate-900">20 випадкових питань</h2>
      <p className="text-sm leading-6 text-slate-500">
        Швидке тренування з питань усіх тем.
      </p>
      <p className="text-sm font-bold text-blue-600">Почати тестування</p>
    </Link>
  );
}
