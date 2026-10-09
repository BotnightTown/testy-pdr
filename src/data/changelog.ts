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
    version: "1.5.01",
    date: "09.10.2026",
    changes: [
      {
        type: "new",
        text: "Додана функція збереження неправильних відповідей та проходження їх окремим тестом",
      },
    ],
  },
  {
    version: "1.5.0",
    date: "09.10.2026",
    changes: [
      {
        type: "new",
        text: "Додана можливість позначати питання як вибрані та проходити їх окремим тестом з головної сторінки",
      },
      {
        type: "improvement",
        text: "Вибрані питання зберігаються між сесіями у браузері",
      },
    ],
  },
  {
    version: "1.4.1",
    date: "09.10.2026",
    changes: [
      {
        type: "improvement",
        text: "33-тю тему розділено на окремі підтеми",
      },
    ],
  },
  {
    version: "1.4.0",
    date: "22.09.2026",
    changes: [
      {
        type: "fix",
        text: "На деяких питаннях були зображення яких не мало бути. Вони прибрані",
      },
    ],
  },
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
