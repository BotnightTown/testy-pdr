import { memo } from "react";
import { AnswerResult } from "@/types/question.types";

interface Props {
  questions: any[];
  currentIdx: number;
  answerResults: Record<number, AnswerResult>;
  onNavigate: (index: number) => void;
}

function QuestionNavigationComponent({
  questions,
  currentIdx,
  answerResults,
  onNavigate,
}: Props) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {questions.map((question, index) => {
        const isActive = index === currentIdx;
        const answerResult = answerResults[index];

        const styles = answerResult?.isCorrect
          ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
          : answerResult
            ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
            : isActive
              ? "border-slate-400 dark:border-slate-500 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              : "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400";

        return (
          <button
            key={`${question.section}-${question.question_id}`}
            onClick={() => onNavigate(index)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl border text-sm font-bold transition-colors cursor-pointer ${styles}`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

export default memo(QuestionNavigationComponent);
