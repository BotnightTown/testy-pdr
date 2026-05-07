"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDrivingCategorySettings } from "@/hooks/useDrivingCategorySettings";
import {
  getRandomQuestions,
  getQuestionsByTheme,
  getQuestionTheme,
  isCorrectAnswer,
} from "@/lib/quiz-service";

interface AnswerResult {
  selectedOptionId: number;
  isCorrect: boolean;
}

export default function QuizPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerResults, setAnswerResults] = useState<
    Record<number, AnswerResult>
  >({});
  const nextQuestionTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [selectedCategoryIds] = useDrivingCategorySettings();
  const themeId = Array.isArray(id) ? id[0] : id;
  const isRandomQuiz = themeId?.startsWith("random-") ?? false;

  const themeQuestions = isRandomQuiz
    ? getRandomQuestions(20, undefined, themeId, selectedCategoryIds)
    : getQuestionsByTheme(themeId ?? "");
  const themeInfo = isRandomQuiz ? undefined : getQuestionTheme(themeId ?? "");
  const quizTitle = isRandomQuiz ? "20 випадкових питань" : themeInfo?.title;
  const quizLabel = isRandomQuiz ? "Випадковий тест" : `Тема #${themeId}`;
  const backHref = isRandomQuiz ? "/" : "/topics";
  const backLabel = isRandomQuiz ? "На головну" : "Назад до тем";

  const currentQuestion = themeQuestions[currentIdx];
  const currentAnswerResult = answerResults[currentIdx];
  const getFullImageSrc = (src: string) => {
    if (!src) return "";
    return src.startsWith("/") || src.startsWith("http") ? src : `/${src}`;
  };
  const rawImages = currentQuestion?.image;
  const imagesArray = Array.isArray(rawImages)
    ? rawImages
    : rawImages
      ? [rawImages]
      : [];

  useEffect(() => {
    return () => {
      if (nextQuestionTimeout.current) {
        clearTimeout(nextQuestionTimeout.current);
      }
    };
  }, []);

  const goToQuestion = (index: number) => {
    if (nextQuestionTimeout.current) {
      clearTimeout(nextQuestionTimeout.current);
    }

    setCurrentIdx(index);
  };

  if (!currentQuestion)
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Питання не знайдено
          </h1>
          <button
            onClick={() => router.push("/")}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition-colors hover:bg-slate-800"
          >
            До списку тем
          </button>
        </div>
      </main>
    );

  const handleAnswer = (optionId: number) => {
    if (currentAnswerResult) {
      return;
    }

    const isCorrect = isCorrectAnswer(currentQuestion, optionId);

    setAnswerResults((prev) => ({
      ...prev,
      [currentIdx]: {
        selectedOptionId: optionId,
        isCorrect,
      },
    }));

    if (isCorrect && currentIdx < themeQuestions.length - 1) {
      nextQuestionTimeout.current = setTimeout(() => {
        setCurrentIdx((prev) => prev + 1);
      }, 600);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-6">
          <button
            onClick={() => router.push(backHref)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            {backLabel}
          </button>
        </nav>

        <header className="mb-8">
          <div className="flex items-center justify-between mb-2 gap-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {quizLabel}
            </span>
            <span className="text-sm font-bold text-slate-400">
              {currentIdx + 1} / {themeQuestions.length}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-snug">
            {quizTitle}
          </h1>
        </header>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {themeQuestions.map((question, index) => {
            const isActive = index === currentIdx;
            const answerResult = answerResults[index];
            const questionButtonStyles = answerResult?.isCorrect
              ? "border-green-500 bg-green-50 text-green-700"
              : answerResult
                ? "border-red-500 bg-red-50 text-red-700"
                : isActive
                  ? "border-slate-400 bg-slate-100 text-slate-900"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700";

            return (
              <button
                key={`${question.section}-${question.question_id}`}
                onClick={() => goToQuestion(index)}
                className={`flex h-10 min-w-10 items-center justify-center rounded-xl border text-sm font-bold transition-colors cursor-pointer ${
                  isActive ? "ring-2 ring-slate-200" : ""
                } ${questionButtonStyles}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm transition-all">
          <p className="text-lg text-slate-800 font-semibold mb-6">
            {currentQuestion.question}
          </p>

          {imagesArray.length > 0 && (
            <div
              className={`mb-8 grid gap-6 ${
                imagesArray.length > 1
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {imagesArray.map((img, index) => {
                const description = currentQuestion.image_description?.[index];

                return (
                  <div key={index} className="flex flex-col gap-3">
                    <div className="relative min-h-62.5 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                      <Image
                        src={getFullImageSrc(img)}
                        alt={description || `Ілюстрація ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>

                    {description && (
                      <p className="text-base text-black font-semibold px-2 leading-relaxed italic">
                        {description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid gap-3">
            {currentQuestion.options.map((option) => {
              const isSelected =
                currentAnswerResult?.selectedOptionId === option.id;
              const isCorrect = isCorrectAnswer(currentQuestion, option.id);
              const isAnswered = Boolean(currentAnswerResult);
              const shouldShowCorrectAnswer = isAnswered && isCorrect;
              const shouldShowWrongAnswer =
                isAnswered && isSelected && !isCorrect;

              const buttonStyles = shouldShowCorrectAnswer
                ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                : shouldShowWrongAnswer
                  ? "border-red-500 bg-red-50 ring-2 ring-red-100"
                  : isAnswered
                    ? "border-slate-200 bg-slate-50 opacity-70"
                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50";

              const optionNumberStyles = shouldShowCorrectAnswer
                ? "bg-green-600 text-white"
                : shouldShowWrongAnswer
                  ? "bg-red-600 text-white"
                  : isAnswered
                    ? "bg-slate-200 text-slate-600"
                    : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600";

              const optionTextStyles = shouldShowCorrectAnswer
                ? "text-green-800"
                : shouldShowWrongAnswer
                  ? "text-red-800"
                  : isAnswered
                    ? "text-slate-500"
                    : "text-slate-700";

              const answerLabel =
                shouldShowCorrectAnswer && shouldShowWrongAnswer
                  ? "Ваша відповідь"
                  : "";

              const answerLabelStyles = shouldShowCorrectAnswer
                ? "text-green-700"
                : shouldShowWrongAnswer
                  ? "text-red-700"
                  : "";

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start cursor-pointer group disabled:cursor-default ${buttonStyles}`}
                >
                  <span
                    className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-colors ${optionNumberStyles}`}
                  >
                    {option.id}
                  </span>
                  <span className={`pt-0.5 font-medium ${optionTextStyles}`}>
                    {option.text}
                    {answerLabel && (
                      <span
                        className={`mt-2 block text-xs font-bold uppercase tracking-wider ${answerLabelStyles}`}
                      >
                        {answerLabel}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            disabled={currentIdx === 0}
            onClick={() => goToQuestion(currentIdx - 1)}
            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-30 cursor-pointer"
          >
            Попереднє
          </button>

          <button
            disabled={currentIdx === themeQuestions.length - 1}
            onClick={() => goToQuestion(currentIdx + 1)}
            className="px-8 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-30"
          >
            Наступне питання
          </button>
        </div>
      </div>
    </main>
  );
}
