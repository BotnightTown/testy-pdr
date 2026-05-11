import { DrivingCategory, DrivingCategoryId } from "@/types/question.types";

export const EXAM_TIME_LIMIT_SECONDS = 20 * 60;
export const EXAM_MAX_WRONG_ANSWERS = 2;

export const CATEGORY_IDS: DrivingCategoryId[] = ["A", "B", "C", "D", "E", "T"];

export const CATEGORY_ID_SET = new Set<string>(CATEGORY_IDS);

export const CATEGORY_SETTINGS_STORAGE_KEY = "testy-pdr-driving-categories";

export const DEFAULT_DRIVING_CATEGORY_IDS: DrivingCategoryId[] = [];

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
