"use client";

import { useCallback, useMemo, useState } from "react";

import { isCorrectAnswer } from "@/lib/quiz-service";

import { AnswerResult } from "@/types/question.types";

interface Params {
  currentIdx: number;
  currentQuestion: any;

  totalQuestions: number;

  onFinish?: () => void;
  onCorrectAnswer?: () => void;

  getElapsedQuestionTime: () => number;
  stopQuestionTimer: () => void;
}

export function useQuizAnswers({
  currentIdx,
  currentQuestion,
  totalQuestions,
  onFinish,
  onCorrectAnswer,
  getElapsedQuestionTime,
  stopQuestionTimer,
}: Params) {
  const [answerResults, setAnswerResults] = useState<
    Record<number, AnswerResult>
  >({});

  const answeredCount = useMemo(
    () => Object.keys(answerResults).length,
    [answerResults],
  );

  const correctCount = useMemo(
    () =>
      Object.values(answerResults).filter((result) => result.isCorrect).length,
    [answerResults],
  );

  const handleAnswer = useCallback(
    (optionId: number) => {
      if (answerResults[currentIdx]) {
        return;
      }

      const isCorrect = isCorrectAnswer(currentQuestion, optionId);

      const timeSpent = getElapsedQuestionTime();

      stopQuestionTimer();

      setAnswerResults((prev) => ({
        ...prev,
        [currentIdx]: {
          selectedOptionId: optionId,
          isCorrect,
          timeSpent,
        },
      }));

      const nextAnsweredCount = answeredCount + 1;

      if (nextAnsweredCount === totalQuestions) {
        onFinish?.();
      }

      if (isCorrect) {
        onCorrectAnswer?.();
      }
    },
    [
      answerResults,
      currentIdx,
      currentQuestion,
      answeredCount,
      totalQuestions,
      getElapsedQuestionTime,
      stopQuestionTimer,
      onFinish,
      onCorrectAnswer,
    ],
  );

  return {
    answerResults,
    setAnswerResults,

    answeredCount,
    correctCount,

    handleAnswer,
  };
}
