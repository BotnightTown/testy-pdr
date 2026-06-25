import { QuestionTheme } from "@/types/question.types";
import { TopicProgress } from "@/hooks/useTopicProgress";
import Link from "next/link";

interface Props extends QuestionTheme {
  progress?: TopicProgress | null;
}

export default function QuizCard({
  id,
  title,
  questionCount,
  progress,
}: Props) {
  const correct = progress?.correct ?? 0;
  const incorrect = progress?.incorrect ?? 0;
  const total = progress?.total ?? questionCount;

  const correctPct = Math.round((correct / total) * 100);
  const incorrectPct = Math.round((incorrect / total) * 100);
  const answered = correct + incorrect;

  return (
    <Link
      href={`/quiz/${id}`}
      className="group flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 font-bold rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {id}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-slate-800 leading-snug">
            {title}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Кількість питань:{" "}
            <span className="font-medium text-slate-700">{questionCount}</span>
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${correctPct}%` }}
          />
          <div
            className="h-full bg-red-400 transition-all duration-300"
            style={{ width: `${incorrectPct}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-500">
          {answered > 0 ? (
            <span>
              <span className="font-medium text-green-600">{correct}</span>{" "}
              правильно ·{" "}
              <span className="font-medium text-red-500">{incorrect}</span>{" "}
              неправильно
            </span>
          ) : (
            <span>Ще не проходили</span>
          )}
          <span className="font-medium text-slate-600">
            {answered}/{total}
          </span>
        </div>
      </div>
    </Link>
  );
}
