"use client";

import { useCallback, useEffect, useState } from "react";

import { getQuestionKey } from "@/lib/quiz-service";
import type { Question } from "@/types/question.types";

const STORAGE_KEY = "testy-pdr-wrong-question-keys";

const readWrongQuestionKeys = (): string[] => {
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

const writeWrongQuestionKeys = (questionKeys: string[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(questionKeys));
  window.dispatchEvent(new Event("wrong-questions-change"));
};

export function useWrongQuestions() {
  const [wrongQuestionKeys, setWrongQuestionKeys] = useState<string[]>([]);

  useEffect(() => {
    const syncWrongQuestionKeys = () => {
      setWrongQuestionKeys(readWrongQuestionKeys());
    };
    syncWrongQuestionKeys();
    syncWrongQuestionKeys();

    window.addEventListener("storage", syncWrongQuestionKeys);
    window.addEventListener("wrong-questions-change", syncWrongQuestionKeys);

    return () => {
      window.removeEventListener("storage", syncWrongQuestionKeys);
      window.removeEventListener(
        "wrong-questions-change",
        syncWrongQuestionKeys,
      );
    };
  }, []);

  const addWrongQuestion = useCallback((question: Question) => {
    const questionKey = getQuestionKey(question);

    setWrongQuestionKeys((currentKeys) => {
      if (currentKeys.includes(questionKey)) {
        return currentKeys;
      }

      const nextKeys = [...currentKeys, questionKey];

      writeWrongQuestionKeys(nextKeys);

      return nextKeys;
    });
  }, []);

  const removeWrongQuestion = useCallback((question: Question) => {
    const questionKey = getQuestionKey(question);

    setWrongQuestionKeys((currentKeys) => {
      if (!currentKeys.includes(questionKey)) {
        return currentKeys;
      }

      const nextKeys = currentKeys.filter((key) => key !== questionKey);

      writeWrongQuestionKeys(nextKeys);

      return nextKeys;
    });
  }, []);

  return {
    wrongQuestionKeys,
    addWrongQuestion,
    removeWrongQuestion,
  };
}
