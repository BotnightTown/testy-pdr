import { DrivingCategoryId } from "@/types/question.types";

export const CATEGORY_SETTINGS_STORAGE_KEY = "testy-pdr-driving-categories";

const CATEGORY_IDS: DrivingCategoryId[] = ["A", "B", "C", "D", "E", "T"];
const CATEGORY_ID_SET = new Set<string>(CATEGORY_IDS);

export const DEFAULT_DRIVING_CATEGORY_IDS: DrivingCategoryId[] = [];

export function parseDrivingCategoryIds(
  value: string | null
): DrivingCategoryId[] {
  if (!value) {
    return DEFAULT_DRIVING_CATEGORY_IDS;
  }

  try {
    const parsedValue: unknown = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return DEFAULT_DRIVING_CATEGORY_IDS;
    }

    return parsedValue.filter((categoryId): categoryId is DrivingCategoryId => {
      return typeof categoryId === "string" && CATEGORY_ID_SET.has(categoryId);
    });
  } catch {
    return DEFAULT_DRIVING_CATEGORY_IDS;
  }
}

export function readStoredDrivingCategoryIds(): DrivingCategoryId[] {
  if (typeof window === "undefined") {
    return DEFAULT_DRIVING_CATEGORY_IDS;
  }

  return parseDrivingCategoryIds(
    window.localStorage.getItem(CATEGORY_SETTINGS_STORAGE_KEY)
  );
}

export function writeStoredDrivingCategoryIds(
  categoryIds: DrivingCategoryId[]
): void {
  window.localStorage.setItem(
    CATEGORY_SETTINGS_STORAGE_KEY,
    JSON.stringify(categoryIds)
  );
  window.dispatchEvent(new Event(CATEGORY_SETTINGS_STORAGE_KEY));
}
