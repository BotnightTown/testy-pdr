import { formatTime } from "@/utils/formatTime";
import { IoMdStopwatch } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

interface Props {
  quizLabel: string;
  quizTitle?: string;
  totalSeconds: number;
  currentIdx: number;
  totalQuestions: number;
  backHref: string;
  backLabel: string;
}

export default function QuizHeader({
  quizLabel,
  quizTitle,
  totalSeconds,
  currentIdx,
  totalQuestions,
  backHref,
  backLabel,
}: Props) {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-2 gap-4 flex-wrap">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <IoMdArrowBack className="w-4 h-4" />
          {backLabel}
        </Link>

        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
          {quizLabel}
        </span>

        <div className="flex items-center gap-3 text-sm font-semibold">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm text-slate-600">
            <IoMdStopwatch className="w-4 h-4 text-slate-400" />
            <span className="tabular-nums">{formatTime(totalSeconds)}</span>
          </div>

          <span className="text-slate-400">
            {currentIdx + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      <h1 className="text-xl font-bold text-slate-900 leading-snug">
        {quizTitle}
      </h1>
    </header>
  );
}
