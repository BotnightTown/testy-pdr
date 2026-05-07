"use client";

interface Props {
  currentIdx: number;
  totalQuestions: number;

  onPrev: () => void;
  onNext: () => void;
}

export default function QuizFooterNavigation({
  currentIdx,
  totalQuestions,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-8">
      <button
        disabled={currentIdx === 0}
        onClick={onPrev}
        className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-30 cursor-pointer"
      >
        Попереднє питання
      </button>

      <button
        disabled={currentIdx === totalQuestions - 1}
        onClick={onNext}
        className="px-8 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-30"
      >
        Наступне питання
      </button>
    </div>
  );
}
