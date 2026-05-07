"use client";

interface QuizResultsModalProps {
  isOpen: boolean;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  totalTime: string;
  onClose: () => void;
}

export default function QuizResultsModal({
  isOpen,
  correctAnswers,
  wrongAnswers,
  totalQuestions,
  totalTime,
  onClose,
}: QuizResultsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
          Тест завершено 🎉
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-green-50 dark:bg-green-900/20 px-4 py-3 border border-green-200 dark:border-green-700">
            <span className="font-medium text-green-700 dark:text-green-400">
              Правильні відповіді
            </span>
            <span className="font-bold text-green-800 dark:text-green-300">
              {correctAnswers}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-200 dark:border-red-700">
            <span className="font-medium text-red-700 dark:text-red-400">
              Неправильні відповіді
            </span>
            <span className="font-bold text-red-800 dark:text-red-300">
              {wrongAnswers}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-700 px-4 py-3 border border-slate-200 dark:border-slate-600">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Час проходження
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {totalTime}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border border-blue-200 dark:border-blue-700">
            <span className="font-medium text-blue-700 dark:text-blue-400">
              Всього питань
            </span>
            <span className="font-bold text-blue-800 dark:text-blue-300">
              {totalQuestions}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-slate-900 dark:bg-slate-700 py-3 font-bold text-white hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
        >
          Закрити
        </button>
      </div>
    </div>
  );
}
