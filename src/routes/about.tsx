import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Users, CalendarDays, Code2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О проекте MotoDrive — группа Web25-2Б, АГПК" },
      {
        name: "description",
        content:
          "Учебный проект MotoDrive: создатель Даниель, главный разработчик Сайфулло, группа Web25-2Б, колледж АГПК, 2026 год.",
      },
      { property: "og:title", content: "О проекте MotoDrive" },
      {
        property: "og:description",
        content: "Даниель и Сайфулло, группа Web25-2Б, АГПК, 2026 год.",
      },
    ],
  }),
  component: AboutPage,
});

const facts = [
  { icon: Users, label: "Создатель", value: "Даниель" },
  { icon: Code2, label: "Главный разработчик", value: "Сайфулло" },
  { icon: GraduationCap, label: "Группа и колледж", value: "Web25-2Б, АГПК" },
  { icon: CalendarDays, label: "Год", value: "2026" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">О проекте</h1>
      <p className="mt-4 text-muted-foreground">
        MotoDrive — учебный веб-проект мотосалона: каталог мотоциклов с характеристиками,
        страницы отдельных моделей, форма заявки на покупку и админ-панель для управления
        техникой и заявками.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label} className="rounded-xl border border-border bg-card p-5">
            <f.icon className="size-5 text-primary" />
            <p className="spec-label mt-3">{f.label}</p>
            <p className="font-display text-xl font-semibold">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl font-bold uppercase">Состав проекта</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>Главная страница с описанием салона и популярными моделями.</li>
          <li>Каталог с поиском, фильтром по типу и сортировкой.</li>
          <li>Страницы моделей с полными характеристиками, включая максимальную скорость.</li>
          <li>Форма заявки с проверкой данных и уведомлением об отправке.</li>
          <li>Админ-панель: добавление, изменение и удаление мотоциклов, список заявок.</li>
        </ul>
        <p className="mt-6 text-sm">
          © 2026 MotoDrive | Группа Web25-2Б | Колледж АГПК
        </p>
      </div>
    </div>
  );
}
