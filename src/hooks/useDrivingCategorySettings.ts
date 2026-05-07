"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  CATEGORY_SETTINGS_STORAGE_KEY,
  DEFAULT_DRIVING_CATEGORY_IDS,
  parseDrivingCategoryIds,
  writeStoredDrivingCategoryIds,
} from "@/lib/category-settings";
import { DrivingCategoryId } from "@/types/question.types";

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CATEGORY_SETTINGS_STORAGE_KEY, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CATEGORY_SETTINGS_STORAGE_KEY, onStoreChange);
  };
};

const getServerSnapshot = () => DEFAULT_DRIVING_CATEGORY_IDS;

const getSnapshot = () => {
  return window.localStorage.getItem(CATEGORY_SETTINGS_STORAGE_KEY) ?? "[]";
};

export function useDrivingCategorySettings(): [
  DrivingCategoryId[],
  (categoryIds: DrivingCategoryId[]) => void,
] {
  const categoryIdsValue = useSyncExternalStore(subscribe, getSnapshot, () =>
    JSON.stringify(getServerSnapshot()),
  );
  const categoryIds = useMemo(
    () => parseDrivingCategoryIds(categoryIdsValue),
    [categoryIdsValue],
  );

  return [categoryIds, writeStoredDrivingCategoryIds];
}
