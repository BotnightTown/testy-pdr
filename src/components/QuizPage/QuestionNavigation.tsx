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
    <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
      {questions.map((question, index) => {
        const isActive = index === currentIdx;
        const answerResult = answerResults[index];

        const styles = answerResult?.isCorrect
          ? "border-green-500 bg-green-50 text-green-700"
          : answerResult
            ? "border-red-500 bg-red-50 text-red-700"
            : isActive
              ? "border-slate-400 bg-slate-100 text-slate-900"
              : "border-slate-200 bg-slate-50 text-slate-600";

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
