export interface QuestionTheme {
  id: string;
  title: string;
  questionCount: number;
}

export type DrivingCategoryId = "A" | "B" | "C" | "D" | "E" | "T";

export interface DrivingCategory {
  id: DrivingCategoryId;
  title: string;
  description: string;
  sections: string[];
}

export interface Question {
  section: string;
  section_title: string;
  question_id: number;
  question: string;
  options: QuestionOption[];
  answer: string;
  image_description: string[];
  image: string | string[];
}

export interface QuestionOption {
  id: number;
  text: string;
}

export interface AnswerResult {
  selectedOptionId: number;
  isCorrect: boolean;
  timeSpent: number;
}
