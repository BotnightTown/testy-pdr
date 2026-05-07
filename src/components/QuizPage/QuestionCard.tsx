import QuestionImages from "@/components/QuizPage/QuestionImages";
import AnswerOptions from "@/components/QuizPage/AnswerOptions";

interface Props {
  currentQuestion: any;
  currentAnswerResult: any;
  questionSeconds: number;
  onAnswer: (id: number) => void;
}

export default function QuestionCard({
  currentQuestion,
  currentAnswerResult,
  questionSeconds,
  onAnswer,
}: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 sm:p-8 shadow-sm transition-all">
      <p className="text-lg text-slate-800 dark:text-slate-200 font-semibold mb-6">
        {currentQuestion.question}
      </p>

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
