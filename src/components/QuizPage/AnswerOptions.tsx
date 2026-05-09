"use client";

import { isCorrectAnswer } from "@/lib/quiz-service";

import AnswerOption from "./AnswerOption";

interface Props {
  question: any;
  answerResult?: {
    selectedOptionId: number;
    isCorrect: boolean;
  };

  onAnswer: (optionId: number) => void;
}

export default function AnswerOptions({
  question,
  answerResult,
  onAnswer,
}: Props) {
  return (
    <div className="grid gap-3">
      {question.options.map((option: any) => {
        const isAnswered = Boolean(answerResult);

        const isSelected = answerResult?.selectedOptionId === option.id;

        const isCorrect = isCorrectAnswer(question, option.id);

        const shouldShowCorrectAnswer = isAnswered && isCorrect;

        const shouldShowWrongAnswer = isAnswered && isSelected && !isCorrect;

        return (
          <AnswerOption
            key={option.id}
            optionId={option.id}
            optionText={option.text}
            isAnswered={isAnswered}
            isSelected={isSelected}
            shouldShowCorrectAnswer={shouldShowCorrectAnswer}
            shouldShowWrongAnswer={shouldShowWrongAnswer}
            onClick={onAnswer}
          />
        );
      })}
    </div>
  );
}
