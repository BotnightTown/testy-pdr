"use client";

import { useCallback, useEffect, useState } from "react";

export interface TopicProgress {
  correct: number;
  incorrect: number;
  total: number;
}

const STORAGE_KEY_PREFIX = "quiz-progress::";

export function getTopicProgressKey(themeId: string): string {
  return `${STORAGE_KEY_PREFIX}${themeId}`;
}

export function readTopicProgress(themeId: string): TopicProgress | null {
  try {
    const raw = localStorage.getItem(getTopicProgressKey(themeId));
    return raw ? (JSON.parse(raw) as TopicProgress) : null;
  } catch {
    return null;
  }
}

export function writeTopicProgress(
  themeId: string,
  progress: TopicProgress,
): void {
  try {
    localStorage.setItem(
      getTopicProgressKey(themeId),
      JSON.stringify(progress),
    );
  } catch {}
}

export function clearTopicProgress(themeId: string): void {
  try {
    localStorage.removeItem(getTopicProgressKey(themeId));
  } catch {}
}

export function useTopicProgress(themeId: string) {
  const [progress, setProgress] = useState<TopicProgress | null>(null);

  useEffect(() => {
    setProgress(readTopicProgress(themeId));
  }, [themeId]);

  const saveAnswer = useCallback(
    (isCorrect: boolean, totalQuestions: number) => {
      setProgress((prev) => {
        const current: TopicProgress = prev ?? {
          correct: 0,
          incorrect: 0,
          total: totalQuestions,
        };

        const next: TopicProgress = {
          ...current,
          total: totalQuestions,
          correct: current.correct + (isCorrect ? 1 : 0),
          incorrect: current.incorrect + (isCorrect ? 0 : 1),
        };

        writeTopicProgress(themeId, next);
        return next;
      });
    },
    [themeId],
  );

  const reset = useCallback(() => {
    clearTopicProgress(themeId);
    setProgress(null);
  }, [themeId]);

  return { progress, saveAnswer, reset };
}

export function useAllTopicsProgress(themeIds: string[]) {
  const [progressMap, setProgressMap] = useState<
    Record<string, TopicProgress | null>
  >({});

  useEffect(() => {
    const map: Record<string, TopicProgress | null> = {};
    themeIds.forEach((id) => {
      map[id] = readTopicProgress(id);
    });
    setProgressMap(map);
  }, [themeIds.join(",")]);

  return progressMap;
}
