import { useMemo } from "react";
import {
  getQuestionsByTheme,
  getQuestionTheme,
  getRandomQuestions,
} from "@/lib/quiz-service";
import { DrivingCategoryId } from "@/types/question.types";

export function useQuizData(
  themeId: string | undefined,
  selectedCategoryIds: DrivingCategoryId[],
) {
  return useMemo(() => {
    const isRandomQuiz = themeId?.startsWith("random-") ?? false;

    const themeQuestions = isRandomQuiz
      ? getRandomQuestions(20, undefined, themeId, selectedCategoryIds)
      : getQuestionsByTheme(themeId ?? "");

    const themeInfo = isRandomQuiz
      ? undefined
      : getQuestionTheme(themeId ?? "");

    return {
      isRandomQuiz,
      themeQuestions,
      themeInfo,
      quizTitle: isRandomQuiz ? "20 випадкових питань" : themeInfo?.title,
      quizLabel: isRandomQuiz ? "Випадковий тест" : `Тема #${themeId}`,
      backHref: isRandomQuiz ? "/" : "/topics",
      backLabel: isRandomQuiz ? "На головну" : "Назад до тем",
    };
  }, [themeId, selectedCategoryIds]);
}
