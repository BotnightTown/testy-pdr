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
  wrongQuestionKeys: string[] = [],
) {
  return useMemo(() => {
    const isRandomQuiz = themeId?.startsWith("random-") ?? false;
    const isExam = themeId?.startsWith("exam-") ?? false;
    const isFavoritesQuiz = themeId === "favorites";
    const isMistakesQuiz = themeId === "mistakes";
    const isGeneratedQuiz =
      isRandomQuiz || isExam || isFavoritesQuiz || isMistakesQuiz;

    const themeQuestions = isFavoritesQuiz
      ? getQuestionsByKeys(favoriteQuestionKeys)
      : isMistakesQuiz
        ? getQuestionsByKeys(wrongQuestionKeys)
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
      isMistakesQuiz,
      themeQuestions,
      themeInfo,
      quizTitle: isExam
        ? "Екзамен"
        : isRandomQuiz
          ? "20 випадкових питань"
          : isFavoritesQuiz
            ? "Вибрані питання"
          : isMistakesQuiz
            ? "Питання з помилками"
          : themeInfo?.title,
      quizLabel: isExam
        ? "Екзаменаційний режим"
        : isRandomQuiz
          ? "Випадковий тест"
          : isFavoritesQuiz
            ? "Обране"
          : isMistakesQuiz
            ? "Помилки"
          : `Тема #${themeId}`,
      backHref: isGeneratedQuiz ? "/" : "/topics",
      backLabel: isGeneratedQuiz ? "На головну" : "Назад до тем",
    };
  }, [themeId, selectedCategoryIds, favoriteQuestionKeys, wrongQuestionKeys]);
}
