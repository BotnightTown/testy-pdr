import { useMemo } from "react";
import {
  getQuestionsByKeys,
  getQuestionsByTheme,
  getQuestionTheme,
  getRandomQuestions,
} from "@/lib/quiz-service";
import { DrivingCategoryId } from "@/types/question.types";

export function useQuizData(
  themeId: string | undefined,
  selectedCategoryIds: DrivingCategoryId[],
  favoriteQuestionKeys: string[] = [],
) {
  return useMemo(() => {
    const isRandomQuiz = themeId?.startsWith("random-") ?? false;
    const isExam = themeId?.startsWith("exam-") ?? false;
    const isFavoritesQuiz = themeId === "favorites";
    const isGeneratedQuiz = isRandomQuiz || isExam || isFavoritesQuiz;

    const themeQuestions = isFavoritesQuiz
      ? getQuestionsByKeys(favoriteQuestionKeys)
      : isGeneratedQuiz
        ? getRandomQuestions(20, undefined, themeId, selectedCategoryIds)
        : getQuestionsByTheme(themeId ?? "");

    const themeInfo = isGeneratedQuiz
      ? undefined
      : getQuestionTheme(themeId ?? "");

    return {
      isRandomQuiz,
      isExam,
      isFavoritesQuiz,
      themeQuestions,
      themeInfo,
      quizTitle: isExam
        ? "Екзамен"
        : isRandomQuiz
          ? "20 випадкових питань"
          : isFavoritesQuiz
            ? "Вибрані питання"
          : themeInfo?.title,
      quizLabel: isExam
        ? "Екзаменаційний режим"
        : isRandomQuiz
          ? "Випадковий тест"
          : isFavoritesQuiz
            ? "Обране"
          : `Тема #${themeId}`,
      backHref: isGeneratedQuiz ? "/" : "/topics",
      backLabel: isGeneratedQuiz ? "На головну" : "Назад до тем",
    };
  }, [themeId, selectedCategoryIds, favoriteQuestionKeys]);
}
