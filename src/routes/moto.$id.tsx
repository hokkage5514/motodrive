import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/moto-data";
import { useMotos } from "@/lib/moto-store";

export const Route = createFileRoute("/moto/$id")({
  head: () => ({
    meta: [
      { title: "Мотоцикл — характеристики и цена | MotoDrive" },
      {
        name: "description",
        content:
          "Подробные характеристики мотоцикла: год, объём двигателя, мощность, максимальная скорость и цена в MotoDrive.",
      },
      { property: "og:title", content: "Мотоцикл в каталоге MotoDrive" },
      {
        property: "og:description",
        content: "Характеристики, описание и заявка на покупку выбранной модели.",
      },
    ],
  }),
  component: MotoPage,
});

function MotoPage() {
  const { id } = Route.useParams();
  const motos = useMotos();
  const moto = motos.find((m) => m.id === id);

  if (!moto) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold uppercase">Модель не найдена</h1>
        <p className="mt-3 text-muted-foreground">
          Возможно, мотоцикл был удалён из каталога.
        </p>
        <Link to="/catalog" className="mt-6 inline-block text-primary hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const specs = [
    { label: "Тип", value: moto.type },
    { label: "Год выпуска", value: `${moto.year}` },
    { label: "Объём двигателя", value: `${moto.engine} см³` },
    { label: "Мощность", value: `${moto.power} л.с.` },
    { label: "Максимальная скорость", value: `${moto.topSpeed} км/ч` },
    { label: "Бренд", value: moto.brand },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/catalog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Каталог
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={moto.image}
            alt={moto.name}
            className="aspect-[3/2] w-full object-cover"
          />
        </div>

        <div>
          <p className="spec-label">{moto.brand}</p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
            {moto.name}
          </h1>
          <p className="mt-4 font-display text-3xl text-primary">{formatPrice(moto.price)}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card p-3">
                <dt className="spec-label">{s.label}</dt>
                <dd className="mt-1 font-display text-base font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/request"
              search={{ moto: moto.name }}
              className="glow inline-flex items-center rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              Купить
            </Link>
            <Link
              to="/request"
              search={{ moto: moto.name }}
              className="inline-flex items-center rounded-md border border-border px-6 py-3 font-display text-sm font-semibold uppercase transition-colors hover:bg-accent"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <h2 className="font-display text-xl font-bold uppercase">Описание</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{moto.description}</p>
      </div>
    </div>
  );
}
