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
  onAnswer,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-8 shadow-sm transition-all">
      <p className="text-lg text-slate-800 font-semibold mb-3">
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
