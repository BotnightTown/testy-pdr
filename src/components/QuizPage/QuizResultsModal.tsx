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
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Тест завершено 🎉
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 border border-green-200">
            <span className="font-medium text-green-700">
              Правильні відповіді
            </span>
            <span className="font-bold text-green-800">{correctAnswers}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 border border-red-200">
            <span className="font-medium text-red-700">
              Неправильні відповіді
            </span>
            <span className="font-bold text-red-800">{wrongAnswers}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 border border-slate-200">
            <span className="font-medium text-slate-700">Час проходження</span>
            <span className="font-bold text-slate-900">{totalTime}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 border border-blue-200">
            <span className="font-medium text-blue-700">Всього питань</span>
            <span className="font-bold text-blue-800">{totalQuestions}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-slate-900 py-3 font-bold text-white hover:bg-slate-800 transition-colors"
        >
          Закрити
        </button>
      </div>
    </div>
  );
}
