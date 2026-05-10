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
    const isExam = themeId?.startsWith("exam-") ?? false;
    const isGeneratedQuiz = isRandomQuiz || isExam;

    const themeQuestions = isGeneratedQuiz
      ? getRandomQuestions(20, undefined, themeId, selectedCategoryIds)
      : getQuestionsByTheme(themeId ?? "");

    const themeInfo = isGeneratedQuiz
      ? undefined
      : getQuestionTheme(themeId ?? "");

    return {
      isRandomQuiz,
      isExam,
      themeQuestions,
      themeInfo,
      quizTitle: isExam
        ? "Екзамен"
        : isRandomQuiz
          ? "20 випадкових питань"
          : themeInfo?.title,
      quizLabel: isExam
        ? "Екзаменаційний режим"
        : isRandomQuiz
          ? "Випадковий тест"
          : `Тема #${themeId}`,
      backHref: isGeneratedQuiz ? "/" : "/topics",
      backLabel: isGeneratedQuiz ? "На головну" : "Назад до тем",
    };
  }, [themeId, selectedCategoryIds]);
}
