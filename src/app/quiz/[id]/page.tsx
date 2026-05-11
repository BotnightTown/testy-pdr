"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";

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
  const EXAM_TIME_LIMIT_SECONDS = 20 * 60;
  const EXAM_MAX_WRONG_ANSWERS = 2;

  const { id } = useParams();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerResults, setAnswerResults] = useState<
    Record<number, AnswerResult>
  >({});
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isExamReviewMode, setIsExamReviewMode] = useState(false);
  const nextQuestionTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [selectedCategoryIds] = useDrivingCategorySettings();

  const themeId = Array.isArray(id) ? id[0] : id;

  const { isExam, themeQuestions, quizTitle, quizLabel, backHref, backLabel } =
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

  const wrongCount = answeredCount - correctCount;
  const isExamFailed = isExam && wrongCount >= EXAM_MAX_WRONG_ANSWERS;

  const finishQuiz = useCallback(
    (delay = 500) => {
      if (nextQuestionTimeout.current) {
        clearTimeout(nextQuestionTimeout.current);
      }

      stopQuestionTimer();
      stopTotalTimer();
      setIsQuizFinished(true);

      setTimeout(() => {
        setShowResultsModal(true);
      }, delay);
    },
    [stopQuestionTimer, stopTotalTimer],
  );

  useEffect(() => {
    if (isQuizFinished) {
      stopQuestionTimer();
      return;
    }

    if (!answerResults[currentIdx]) {
      startQuestionTimer();
    } else {
      stopQuestionTimer();

      setQuestionSeconds(answerResults[currentIdx].timeSpent);
    }
  }, [
    answerResults,
    currentIdx,
    isQuizFinished,
    startQuestionTimer,
    stopQuestionTimer,
    setQuestionSeconds,
  ]);

  useEffect(() => {
    if (!isExam || showResultsModal || totalSeconds < EXAM_TIME_LIMIT_SECONDS) {
      return;
    }

    finishQuiz(0);
  }, [
    EXAM_TIME_LIMIT_SECONDS,
    finishQuiz,
    isExam,
    showResultsModal,
    totalSeconds,
  ]);

  const canNavigateToQuestion = useCallback(
    (index: number) => {
      if (index < 0 || index >= themeQuestions.length) {
        return false;
      }

      return !isExam || isExamReviewMode || !answerResults[index];
    },
    [answerResults, isExam, isExamReviewMode, themeQuestions.length],
  );

  const goToQuestion = useCallback(
    (index: number) => {
      if (!canNavigateToQuestion(index)) {
        return;
      }

      if (nextQuestionTimeout.current) {
        clearTimeout(nextQuestionTimeout.current);
      }

      setCurrentIdx(index);
    },
    [canNavigateToQuestion],
  );

  const handleAnswer = useCallback(
    (optionId: number) => {
      if (currentAnswerResult || isQuizFinished) return;

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
      const nextWrongCount = wrongCount + (isCorrect ? 0 : 1);
      const isQuizCompleted = nextAnsweredCount === themeQuestions.length;
      const isExamFailed = isExam && nextWrongCount >= EXAM_MAX_WRONG_ANSWERS;

      if (isQuizCompleted || isExamFailed) {
        finishQuiz();
        return;
      }

      if (!isExam && isCorrect && currentIdx < themeQuestions.length - 1) {
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
      wrongCount,
      isExam,
      isQuizFinished,
      finishQuiz,
      EXAM_MAX_WRONG_ANSWERS,
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
          isExam={isExam && !isExamReviewMode}
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
          isPrevDisabled={!canNavigateToQuestion(currentIdx - 1)}
          isNextDisabled={!canNavigateToQuestion(currentIdx + 1)}
          onPrev={() => goToQuestion(currentIdx - 1)}
          onNext={() => goToQuestion(currentIdx + 1)}
        />
      </div>

      <QuizResultsModal
        isExamFailed={isExamFailed}
        isOpen={showResultsModal}
        correctAnswers={correctCount}
        wrongAnswers={wrongCount}
        totalQuestions={themeQuestions.length}
        totalTime={formatTime(totalSeconds)}
        onReview={() => {
          setIsExamReviewMode(true);
          setShowResultsModal(false);
        }}
      />
    </main>
  );
}
