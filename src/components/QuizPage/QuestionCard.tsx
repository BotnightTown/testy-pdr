import QuestionImages from "@/components/QuizPage/QuestionImages";
import AnswerOptions from "@/components/QuizPage/AnswerOptions";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface Props {
  currentQuestion: any;
  currentAnswerResult: any;
  questionSeconds: number;
  isFavorite: boolean;
  onAnswer: (id: number) => void;
  onToggleFavorite: () => void;
}

export default function QuestionCard({
  currentQuestion,
  currentAnswerResult,
  isFavorite,
  onAnswer,
  onToggleFavorite,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-8 shadow-sm transition-all">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-lg text-slate-800 font-semibold">
          {currentQuestion.question}
        </p>

        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Прибрати з вибраних" : "Додати до вибраних"}
          title={isFavorite ? "Прибрати з вибраних" : "Додати до вибраних"}
          className="shrink-0 rounded-lg border border-slate-200 p-2 text-amber-500 transition-colors hover:border-amber-300 hover:bg-amber-50 cursor-pointer"
        >
          {isFavorite ? (
            <IoStar className="h-5 w-5" />
          ) : (
            <IoStarOutline className="h-5 w-5" />
          )}
        </button>
      </div>

      <QuestionImages
        images={currentQuestion.image}
        descriptions={currentQuestion.image_description}
      />

      <AnswerOptions
        question={currentQuestion}
        answerResult={currentAnswerResult}
        onAnswer={onAnswer}
      />
    </div>
  );
}
