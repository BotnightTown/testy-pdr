import { QuestionTheme } from "@/types/question.types";
import Link from "next/link";

export default function QuizCard({ id, title, questionCount }: QuestionTheme) {
  return (
    <Link
      href={`/quiz/${id}`}
      className="group flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 font-bold rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        {id}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-800 leading-snug">
          {title}
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Кількість питань:{" "}
          <span className="font-medium text-slate-700">{questionCount}</span>
        </p>
      </div>
    </Link>
  );
}
