import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Wrench, CreditCard, Gauge } from "lucide-react";
import heroImage from "@/assets/hero-showroom.jpg";
import { MotoCard } from "@/components/moto-card";
import { useMotos } from "@/lib/moto-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MotoDrive — мотосалон: каталог мотоциклов и заявка" },
      {
        name: "description",
        content:
          "MotoDrive — мотосалон с каталогом спортбайков, нейкедов, эндуро, круизеров и туреров. Характеристики, цены и заявка на покупку.",
      },
      { property: "og:title", content: "MotoDrive — мотосалон" },
      {
        property: "og:description",
        content: "Каталог мотоциклов с характеристиками, ценами и заявкой на покупку.",
      },
    ],
  }),
  component: Index,
});

const advantages = [
  { icon: ShieldCheck, title: "Проверенная техника", text: "Полная диагностика перед продажей." },
  { icon: Wrench, title: "Сервис и запчасти", text: "Обслуживание и подготовка к сезону." },
  { icon: CreditCard, title: "Рассрочка и trade-in", text: "Гибкие условия покупки." },
  { icon: Gauge, title: "Тест-драйв", text: "Прокатитесь до покупки на выбранной модели." },
];

function Index() {
  const motos = useMotos();
  const popular = (motos.filter((m) => m.popular).length ? motos.filter((m) => m.popular) : motos).slice(0, 4);

  return (
    <>
      <section className="relative">
        <img
          src={heroImage}
          alt="Мотоциклы в тёмном шоуруме MotoDrive"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="spec-label">Мотосалон · 2026</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase sm:text-6xl">
            Moto<span className="text-primary">Drive</span> — твой мотоцикл ждёт
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Спортбайки, нейкеды, эндуро, круизеры и туреры от проверенных производителей.
            Подробные характеристики, честные цены и помощь в подборе первой или следующей
            техники.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/catalog"
              className="glow inline-flex items-center rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
            >
              Перейти в каталог
            </Link>
            <Link
              to="/request"
              className="inline-flex items-center rounded-md border border-border bg-background/60 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-accent"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => (
            <div key={a.title} className="rounded-xl border border-border bg-card p-5">
              <a.icon className="size-6 text-primary" />
              <p className="mt-3 font-display text-base font-semibold">{a.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl">
            Популярные модели
          </h2>
          <Link to="/catalog" className="text-sm text-primary hover:underline">
            Все мотоциклы →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      </section>
    </>
  );
}
