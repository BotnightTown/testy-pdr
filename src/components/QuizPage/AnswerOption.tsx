"use client";

import { memo } from "react";

interface Props {
  optionId: number;
  optionText: string;

  isAnswered: boolean;
  isSelected: boolean;

  shouldShowCorrectAnswer: boolean;
  shouldShowWrongAnswer: boolean;

  onClick: (optionId: number) => void;
}

function AnswerOptionComponent({
  optionId,
  optionText,
  isAnswered,
  isSelected,
  shouldShowCorrectAnswer,
  shouldShowWrongAnswer,
  onClick,
}: Props) {
  const buttonStyles = shouldShowCorrectAnswer
    ? "border-green-500 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-100 dark:ring-green-900/50"
    : shouldShowWrongAnswer
      ? "border-red-500 bg-red-50 dark:bg-red-900/20 ring-2 ring-red-100 dark:ring-red-900/50"
      : isAnswered
        ? "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 opacity-70"
        : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800";

  const optionNumberStyles = shouldShowCorrectAnswer
    ? "bg-green-600 text-white"
    : shouldShowWrongAnswer
      ? "bg-red-600 text-white"
      : isAnswered
        ? "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400";

  const optionTextStyles = shouldShowCorrectAnswer
    ? "text-green-800 dark:text-green-400"
    : shouldShowWrongAnswer
      ? "text-red-800 dark:text-red-400"
      : isAnswered
        ? "text-slate-500 dark:text-slate-400"
        : "text-slate-700 dark:text-slate-300";

  return (
    <button
      onClick={() => onClick(optionId)}
      disabled={isAnswered}
      className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start cursor-pointer group disabled:cursor-default ${buttonStyles}`}
    >
      <span
        className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-colors ${optionNumberStyles}`}
      >
        {optionId}
      </span>

      <span className={`pt-0.5 font-medium ${optionTextStyles}`}>
        {optionText}
      </span>
    </button>
  );
}

export default memo(AnswerOptionComponent);
