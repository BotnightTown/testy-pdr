"use client";

import { useRouter } from "next/navigation";

interface GeneratedQuizCardProps {
  title: string;
  description: string;
  mode: "random" | "exam";
  buttonText: string;
}

export default function GeneratedQuizCard({
  title,
  description,
  mode,
  buttonText,
}: GeneratedQuizCardProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/quiz/${mode}-${Date.now()}`)}
      className="group flex h-max w-full cursor-pointer flex-col items-start justify-between gap-1 rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm md:h-43"
    >
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm leading-6 text-slate-500">{description}</p>
      <p className="text-sm font-bold text-blue-600">{buttonText}</p>
    </button>
  );
}
