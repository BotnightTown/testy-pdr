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
    ? "border-green-500 bg-green-50 ring-2 ring-green-100"
    : shouldShowWrongAnswer
      ? "border-red-500 bg-red-50 ring-2 ring-red-100"
      : isAnswered
        ? "border-slate-200 bg-slate-50 opacity-70"
        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50";

  const optionNumberStyles = shouldShowCorrectAnswer
    ? "bg-green-600 text-white"
    : shouldShowWrongAnswer
      ? "bg-red-600 text-white"
      : isAnswered
        ? "bg-slate-200 text-slate-600"
        : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600";

  const optionTextStyles = shouldShowCorrectAnswer
    ? "text-green-800"
    : shouldShowWrongAnswer
      ? "text-red-800"
      : isAnswered
        ? "text-slate-500"
        : "text-slate-700";

  return (
    <button
      onClick={() => onClick(optionId)}
      disabled={isAnswered}
      className={`w-full text-left p-2 rounded-xl border transition-all flex gap-4 items-center flex-row justify-start cursor-pointer group disabled:cursor-default ${buttonStyles}`}
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
