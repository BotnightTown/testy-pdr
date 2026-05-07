import { QuestionTheme } from "@/types/question.types";
import Link from "next/link";

export default function QuizCard({ id, title, questionCount }: QuestionTheme) {
  return (
    <Link
      href={`/quiz/${id}`}
      className="group flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {id}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 leading-snug">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Кількість питань:{" "}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {questionCount}
          </span>
        </p>
      </div>
    </Link>
  );
}
