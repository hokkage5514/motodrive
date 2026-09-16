import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MotoCard } from "@/components/moto-card";
import { useMotos } from "@/lib/moto-store";
import { MOTO_TYPES } from "@/lib/moto-data";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог мотоциклов — MotoDrive" },
      {
        name: "description",
        content:
          "Каталог мотоциклов MotoDrive: поиск по названию, фильтр по типу и сортировка по цене и году.",
      },
      { property: "og:title", content: "Каталог мотоциклов — MotoDrive" },
      {
        property: "og:description",
        content: "Поиск, фильтр по типу и сортировка по цене в каталоге MotoDrive.",
      },
    ],
  }),
  component: CatalogPage;
});

type SortKey = "price-asc" | "price-desc" | "year-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Цена: сначала дешевле" },
  { value: "price-desc", label: "Цена: сначала дороже" },
  { value: "year-desc", label: "Сначала новее" },
];

function CatalogPage() {
  const motos = useMotos();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("price-asc");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = motos.filter((m) => {
      const matchesQuery =
        !q ||
        [m.name, m.brand, m.type, m.description].join(" ").toLowerCase().includes(q);
      const matchesType = type === "all" || m.type === type;
      return matchesQuery && matchesType;
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.year - a.year;
    });
  }, [motos, query, type, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">Каталог мотоциклов</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Найдено моделей: {visible.length} из {motos.length}
      </p>

      <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: название, бренд, описание…"
            className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Тип мотоцикла"
          className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
        >
          <option value="all">Все типы</option>
          {MOTO_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Сортировка"
          className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Ничего не найдено. Попробуйте изменить запрос или фильтр.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      )}
    </div>
  );
}
