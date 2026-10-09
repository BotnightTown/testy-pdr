import HomeTabs from "@/components/HomeTabs";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 flex flex-col">
      <div className="mx-auto max-w-5xl grow">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Тестування ПДР
          </h1>
          <p className="mt-2 text-slate-600">Оберіть режим тренування</p>
        </header>

        <HomeTabs />
      </div>

      <footer className="text-center text-slate-500 flex flex-row justify-center items-center gap-1 mt-10">
        <p>created by </p>
        <a href="https://github.com/BotnightTown" className="text-blue-400">
          BotnightTown
        </a>
      </footer>
    </main>
  );
}
