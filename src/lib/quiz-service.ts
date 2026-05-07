import questionData from "@/data/questions.json";
import {
  DrivingCategory,
  DrivingCategoryId,
  Question,
  QuestionTheme,
} from "@/types/question.types";

type RawQuestion = Omit<Question, "image" | "image_description"> &
  Partial<Pick<Question, "image" | "image_description">>;

const questions: Question[] = (questionData as RawQuestion[]).map((question) => ({
  ...question,
  image: question.image ?? "",
  image_description: question.image_description ?? [],
}));

const normalizeThemeId = (id: QuestionTheme["id"] | Question["section"]): string =>
  id;

export const DRIVING_CATEGORIES: DrivingCategory[] = [
  {
    id: "A",
    title: "A1, A",
    description: "Мотоцикли та мопеди",
    sections: ["40", "41", "42", "43"],
  },
  {
    id: "B",
    title: "B1, B",
    description: "Легкові автомобілі",
    sections: ["44", "45", "46", "47"],
  },
  {
    id: "C",
    title: "C1, C",
    description: "Вантажні автомобілі",
    sections: ["48", "49", "50", "51"],
  },
  {
    id: "D",
    title: "D1, D",
    description: "Автобуси",
    sections: ["52", "53", "54", "55"],
  },
  {
    id: "E",
    title: "BE, C1E, CE, D1E, DE",
    description: "Состави транспортних засобів",
    sections: ["56", "57", "58", "59"],
  },
  {
    id: "T",
    title: "T",
    description: "Трамваї та тролейбуси",
    sections: ["60", "61", "62", "63"],
  },
];

const getSeedValue = (seed: string): number => {
  return seed.split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 0);
};

const createSeededRandom = (seed: string) => {
  let value = getSeedValue(seed) || 1;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
};

export function getQuestions(): Question[] {
  return questions;
}

export function getQuestionThemes(): QuestionTheme[] {
  const themes = new Map<Question["section"], QuestionTheme>();

  questions.forEach(({ section, section_title }) => {
    const theme = themes.get(section);

    if (theme) {
      theme.questionCount += 1;
      return;
    }

    themes.set(section, {
      id: section,
      title: section_title,
      questionCount: 1,
    });
  });

  return Array.from(themes.values());
}

export function getDrivingCategories(): DrivingCategory[] {
  return DRIVING_CATEGORIES;
}

export function getAllowedThemeSections(
  categoryIds: DrivingCategoryId[]
): Set<Question["section"]> {
  const selectedCategories = new Set(categoryIds);
  const allowedSections = new Set<Question["section"]>();

  getQuestionThemes().forEach((theme) => {
    if (Number(theme.id) < 40) {
      allowedSections.add(theme.id);
    }
  });

  DRIVING_CATEGORIES.forEach((category) => {
    if (!selectedCategories.has(category.id)) {
      return;
    }

    category.sections.forEach((section) => allowedSections.add(section));
  });

  return allowedSections;
}

export function getQuestionThemesByCategories(
  categoryIds: DrivingCategoryId[]
): QuestionTheme[] {
  const allowedSections = getAllowedThemeSections(categoryIds);

  return getQuestionThemes().filter((theme) => allowedSections.has(theme.id));
}

export function getQuestionsByCategories(
  categoryIds: DrivingCategoryId[]
): Question[] {
  const allowedSections = getAllowedThemeSections(categoryIds);

  return questions.filter((question) => allowedSections.has(question.section));
}

export function getQuestionTheme(
  themeId: QuestionTheme["id"] | Question["section"]
): QuestionTheme | undefined {
  const normalizedThemeId = normalizeThemeId(themeId);

  return getQuestionThemes().find(
    (theme) => normalizeThemeId(theme.id) === normalizedThemeId
  );
}

export function getQuestionsByTheme(
  themeId: QuestionTheme["id"] | Question["section"]
): Question[] {
  const normalizedThemeId = normalizeThemeId(themeId);

  return questions.filter(({ section }) => section === normalizedThemeId);
}

export function getQuestionById(
  themeId: QuestionTheme["id"] | Question["section"],
  questionId: Question["question_id"]
): Question | undefined {
  return getQuestionsByTheme(themeId).find(
    (question) => question.question_id === questionId
  );
}

export function getRandomQuestions(
  count: number,
  themeId?: QuestionTheme["id"] | Question["section"],
  seed?: string,
  categoryIds?: DrivingCategoryId[]
): Question[] {
  const sourceQuestions =
    themeId === undefined
      ? categoryIds
        ? getQuestionsByCategories(categoryIds)
        : questions
      : getQuestionsByTheme(themeId);
  const random = seed ? createSeededRandom(seed) : Math.random;
  const shuffledQuestions = [...sourceQuestions];

  for (let i = shuffledQuestions.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[randomIndex]] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[i],
    ];
  }

  return shuffledQuestions.slice(0, count);
}

export function isCorrectAnswer(
  question: Question,
  optionId: number | string
): boolean {
  return question.answer === String(optionId);
}
