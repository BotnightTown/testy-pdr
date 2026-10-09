"use client";

import { useRouter } from "next/navigation";

import GeneratedQuizCard from "@/components/GeneratedQuizCard";
import MainPageCard from "@/components/MainPageCard";
import { useFavoriteQuestions } from "@/hooks/useFavoriteQuestions";
import { useWrongQuestions } from "@/hooks/useWrongQuestions";
import { getQuestionsByKeys } from "@/lib/quiz-service";

export default function HomeTabs() {
  const router = useRouter();
  const { favoriteQuestionKeys } = useFavoriteQuestions();
  const { wrongQuestionKeys } = useWrongQuestions();
  const favoriteQuestions = getQuestionsByKeys(favoriteQuestionKeys);
  const wrongQuestions = getQuestionsByKeys(wrongQuestionKeys);
  const favoriteQuestionsCount = favoriteQuestions.length;
  const wrongQuestionsCount = wrongQuestions.length;
  const visibleFavoriteQuestions = favoriteQuestions.slice(0, 2);
  const visibleWrongQuestions = wrongQuestions.slice(0, 2);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <GeneratedQuizCard
        title="20 випадкових питань"
        description="Швидке тренування з питань усіх тем."
        mode="random"
        buttonText="Почати тестування"
      />
      <GeneratedQuizCard
        title="Іспит"
        description="Іспит як у сервісному центрі МВС."
        mode="exam"
        buttonText="Почати тестування"
      />
      <button
        type="button"
        disabled={favoriteQuestionsCount === 0}
        onClick={() => router.push("/quiz/favorites")}
        className="group flex h-max w-full cursor-pointer flex-col items-start justify-between gap-1 rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-slate-200 disabled:hover:shadow-none md:min-h-43"
      >
        <h2 className="text-xl font-bold text-slate-900">Вибрані питання</h2>
        {favoriteQuestionsCount > 0 ? (
          <div className="space-y-1 text-sm leading-5 text-slate-500">
            <p className="font-semibold text-slate-600">
              Збережено питань: {favoriteQuestionsCount}
            </p>
            {visibleFavoriteQuestions.map((question) => (
              <p
                key={`${question.section}:${question.question_id}`}
                className="line-clamp-2"
              >
                {question.question}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-500">
            Позначайте питання зірочкою під час проходження тестів.
          </p>
        )}
        <p className="text-sm font-bold text-blue-600">
          {favoriteQuestionsCount > 0
            ? "Почати вибрані"
            : "Поки немає вибраних"}
        </p>
      </button>
      <button
        type="button"
        disabled={wrongQuestionsCount === 0}
        onClick={() => router.push("/quiz/mistakes")}
        className="group flex h-max w-full cursor-pointer flex-col items-start justify-between gap-1 rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-slate-200 disabled:hover:shadow-none md:min-h-43"
      >
        <h2 className="text-xl font-bold text-slate-900">
          Питання з помилками
        </h2>
        {wrongQuestionsCount > 0 ? (
          <div className="space-y-1 text-sm leading-5 text-slate-500">
            <p className="font-semibold text-slate-600">
              Збережено питань: {wrongQuestionsCount}
            </p>
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-500">
            Тут з’являться питання, на які ви відповіли неправильно.
          </p>
        )}
        <p className="text-sm font-bold text-blue-600">
          {wrongQuestionsCount > 0 ? "Повторити помилки" : "Поки немає помилок"}
        </p>
      </button>
      <MainPageCard
        title="Питання по темах"
        description="Оберіть конкретний розділ правил дорожнього руху."
        link="/topics"
        buttonText="Перейти до тем"
      />
      <MainPageCard
        title="Налаштування категорій"
        description="Оберіть категорії водіння для навчання."
        link="/settings"
        buttonText="Вибрати категорії"
      />
      <MainPageCard
        title="Що нового"
        description="Історія оновлень та нові можливості застосунку."
        link="/changelog"
        buttonText="Переглянути"
      />
    </div>
  );
}
