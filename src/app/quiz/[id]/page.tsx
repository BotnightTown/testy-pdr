"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useDrivingCategorySettings } from "@/hooks/useDrivingCategorySettings";

import { isCorrectAnswer } from "@/lib/quiz-service";

import QuizHeader from "@/components/QuizPage/QuizHeader";
import QuestionNavigation from "@/components/QuizPage/QuestionNavigation";
import QuestionCard from "@/components/QuizPage/QuestionCard";
import QuizFooterNavigation from "@/components/QuizPage/QuizFooterNavigation";
import QuizResultsModal from "@/components/QuizPage/QuizResultsModal";

import { useQuizTimer } from "@/hooks/useQuizTimer";
import { useQuizData } from "@/hooks/useQuizData";

import { formatTime } from "@/utils/formatTime";

import { AnswerResult } from "@/types/question.types";

export default function QuizPage() {
  const { id } = useParams();

  const [currentIdx, setCurrentIdx] = useState(0);

  const [answerResults, setAnswerResults] = useState<
    Record<number, AnswerResult>
  >({});

  const [showResultsModal, setShowResultsModal] = useState(false);

  const nextQuestionTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [selectedCategoryIds] = useDrivingCategorySettings();

  const themeId = Array.isArray(id) ? id[0] : id;

  const { themeQuestions, quizTitle, quizLabel, backHref, backLabel } =
    useQuizData(themeId, selectedCategoryIds);

  const {
    totalSeconds,
    questionSeconds,
    setQuestionSeconds,
    startQuestionTimer,
    stopQuestionTimer,
    stopTotalTimer,
    getElapsedQuestionTime,
  } = useQuizTimer();

  const currentQuestion = themeQuestions[currentIdx];

  const currentAnswerResult = answerResults[currentIdx];

  const answeredCount = useMemo(
    () => Object.keys(answerResults).length,
    [answerResults],
  );

  const correctCount = useMemo(
    () => Object.values(answerResults).filter((r) => r.isCorrect).length,
    [answerResults],
  );

  useEffect(() => {
    if (!answerResults[currentIdx]) {
      startQuestionTimer();
    } else {
      stopQuestionTimer();

      setQuestionSeconds(answerResults[currentIdx].timeSpent);
    }
  }, [currentIdx]);

  const goToQuestion = useCallback((index: number) => {
    if (nextQuestionTimeout.current) {
      clearTimeout(nextQuestionTimeout.current);
    }

    setCurrentIdx(index);
  }, []);

  const handleAnswer = useCallback(
    (optionId: number) => {
      if (currentAnswerResult) return;

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

      if (nextAnsweredCount === themeQuestions.length) {
        stopTotalTimer();
        setTimeout(() => {
          setShowResultsModal(true);
        }, 500);
      }

      if (isCorrect && currentIdx < themeQuestions.length - 1) {
        nextQuestionTimeout.current = setTimeout(() => {
          setCurrentIdx((prev) => prev + 1);
        }, 600);
      }
    },
    [
      currentAnswerResult,
      currentQuestion,
      currentIdx,
      answeredCount,
      themeQuestions.length,
      stopQuestionTimer,
      getElapsedQuestionTime,
    ],
  );

  if (!currentQuestion) {
    return <div>Question not found</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <QuizHeader
          quizLabel={quizLabel}
          quizTitle={quizTitle}
          totalSeconds={totalSeconds}
          currentIdx={currentIdx}
          totalQuestions={themeQuestions.length}
          backHref={backHref}
          backLabel={backLabel}
        />

        <QuestionNavigation
          questions={themeQuestions}
          currentIdx={currentIdx}
          answerResults={answerResults}
          onNavigate={goToQuestion}
        />

        <QuestionCard
          currentQuestion={currentQuestion}
          currentAnswerResult={currentAnswerResult}
          questionSeconds={questionSeconds}
          onAnswer={handleAnswer}
        />

        <QuizFooterNavigation
          currentIdx={currentIdx}
          totalQuestions={themeQuestions.length}
          onPrev={() => goToQuestion(currentIdx - 1)}
          onNext={() => goToQuestion(currentIdx + 1)}
        />
      </div>

      <QuizResultsModal
        isOpen={showResultsModal}
        correctAnswers={correctCount}
        wrongAnswers={answeredCount - correctCount}
        totalQuestions={themeQuestions.length}
        totalTime={formatTime(totalSeconds)}
        onClose={() => setShowResultsModal(false)}
      />
    </main>
  );
}
