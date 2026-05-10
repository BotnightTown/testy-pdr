import MainPageCard from "@/components/MainPageCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Тестування ПДР
          </h1>
          <p className="mt-2 text-slate-600">Оберіть режим тренування</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MainPageCard
            title="20 випадкових питань"
            description="Швидке тренування з питань усіх тем."
            link={`/quiz/random-${Date.now()}`}
            buttonText="Почати тестування"
          />
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
        </div>
      </div>
    </main>
  );
}
