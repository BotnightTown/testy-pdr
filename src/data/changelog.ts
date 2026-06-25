export interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: "new" | "fix" | "improvement" | "comment";
    text: string;
  }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "25.06.2026",
    changes: [
      {
        type: "new",
        text: "Сторінка «Що нового» з історією оновлень застосунку",
      },
      {
        type: "new",
        text: "Прогрес-бар на сторінці тем показує скільки питань відповіли правильно та неправильно. Зберігається між сесіями, навіть при достроковому виході з квізу",
      },
      {
        type: "fix",
        text: "Активна кнопка в навігації по питаннях тепер завжди центрується в слайдері при переході між питаннями",
      },
      {
        type: "comment",
        text: "Оскільки цим активно користуються люди, тому я вирішив зробити ченджлог для зручності. Можливо, в майбутньому додам ще якісь фічі, тому буде зручно відслідковувати зміни.",
      },
    ],
  },
];

export const TYPE_LABELS: Record<
  ChangelogEntry["changes"][number]["type"],
  string
> = {
  new: "Нове",
  fix: "Виправлення",
  improvement: "Покращення",
  comment: "Коментар",
};

export const TYPE_STYLES: Record<
  ChangelogEntry["changes"][number]["type"],
  string
> = {
  new: "bg-green-100 text-green-700",
  fix: "bg-orange-100 text-orange-600",
  improvement: "bg-blue-100 text-blue-700",
  comment: " text-gray-800",
};
