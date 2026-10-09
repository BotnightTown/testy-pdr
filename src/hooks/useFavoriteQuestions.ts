"use client";

import { useCallback, useEffect, useState } from "react";

import { getQuestionKey } from "@/lib/quiz-service";
import type { Question } from "@/types/question.types";

const STORAGE_KEY = "testy-pdr-favorite-question-keys";
const LEGACY_STORAGE_KEY = "testy-pdr-favorite-question-ids";

const readFavoriteQuestionKeys = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter((questionKey) => typeof questionKey === "string")
      .filter((questionKey) => questionKey.includes(":"));
  } catch {
    return [];
  }
};

const writeFavoriteQuestionKeys = (questionKeys: string[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(questionKeys));
  window.dispatchEvent(new Event("favorite-questions-change"));
};

export function getStoredFavoriteQuestionKeys(): string[] {
  return readFavoriteQuestionKeys();
}

export function useFavoriteQuestions() {
  const [favoriteQuestionKeys, setFavoriteQuestionKeys] = useState<string[]>(
    [],
  );
  const favoriteQuestionKeySet = new Set(favoriteQuestionKeys);

  useEffect(() => {
    const syncFavoriteQuestionKeys = () => {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      setFavoriteQuestionKeys(readFavoriteQuestionKeys());
    };

    syncFavoriteQuestionKeys();

    window.addEventListener("storage", syncFavoriteQuestionKeys);
    window.addEventListener(
      "favorite-questions-change",
      syncFavoriteQuestionKeys,
    );

    return () => {
      window.removeEventListener("storage", syncFavoriteQuestionKeys);
      window.removeEventListener(
        "favorite-questions-change",
        syncFavoriteQuestionKeys,
      );
    };
  }, []);

  const toggleFavoriteQuestion = useCallback((question: Question) => {
    const questionKey = getQuestionKey(question);

    setFavoriteQuestionKeys((currentKeys) => {
      const isFavorite = currentKeys.includes(questionKey);
      const nextKeys = isFavorite
        ? currentKeys.filter((key) => key !== questionKey)
        : [...currentKeys, questionKey];

      writeFavoriteQuestionKeys(nextKeys);

      return nextKeys;
    });
  }, []);

  return {
    favoriteQuestionKeys,
    favoriteQuestionKeySet,
    toggleFavoriteQuestion,
  };
}
