import { useCallback, useEffect, useRef, useState } from "react";

export function useQuizTimer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [questionSeconds, setQuestionSeconds] = useState(0);

  const questionStartRef = useRef<number>(Date.now());

  const totalIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const questionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const startQuestionTimer = useCallback(() => {
    setQuestionSeconds(0);

    questionStartRef.current = Date.now();

    if (questionIntervalRef.current) {
      clearInterval(questionIntervalRef.current);
    }

    questionIntervalRef.current = setInterval(() => {
      setQuestionSeconds(
        Math.floor((Date.now() - questionStartRef.current) / 1000),
      );
    }, 500);
  }, []);

  const stopQuestionTimer = useCallback(() => {
    if (questionIntervalRef.current) {
      clearInterval(questionIntervalRef.current);
      questionIntervalRef.current = null;
    }
  }, []);

  const stopTotalTimer = useCallback(() => {
    if (totalIntervalRef.current) {
      clearInterval(totalIntervalRef.current);
      totalIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    totalIntervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);

    startQuestionTimer();

    return () => {
      if (totalIntervalRef.current) {
        clearInterval(totalIntervalRef.current);
      }

      if (questionIntervalRef.current) {
        clearInterval(questionIntervalRef.current);
      }
    };
  }, [startQuestionTimer]);

  const getElapsedQuestionTime = () => {
    return Math.floor((Date.now() - questionStartRef.current) / 1000);
  };

  return {
    totalSeconds,
    questionSeconds,
    setQuestionSeconds,
    startQuestionTimer,
    stopQuestionTimer,
    stopTotalTimer,
    getElapsedQuestionTime,
  };
}
