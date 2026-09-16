import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Pencil, Trash2, RotateCcw } from "lucide-react";
import { MOTO_TYPES, formatPrice, type Moto } from "@/lib/moto-data";
import {
  addMoto,
  removeMoto,
  removeRequest,
  resetMotos,
  updateMoto,
  useMotos,
  useRequests,
} from "@/lib/moto-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Админ-панель — MotoDrive" },
      {
        name: "description",
        content:
          "Админ-панель MotoDrive: добавление, редактирование и удаление мотоциклов, список заявок покупателей.",
      },
      { property: "og:title", content: "Админ-панель MotoDrive" },
      {
        property: "og:description",
        content: "Управление каталогом мотоциклов и заявками покупателей.",
      },
    ],
  }),
  component: AdminPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Укажите название"),
  brand: z.string().trim().min(2, "Укажите бренд"),
  type: z.string().trim().min(1, "Укажите тип"),
  price: z.coerce.number().positive("Цена должна быть больше 0"),
  year: z.coerce.number().int().min(1950, "Год от 1950").max(2030, "Год до 2030"),
  engine: z.coerce.number().positive("Объём должен быть больше 0"),
  power: z.coerce.number().positive("Мощность должна быть больше 0"),
  topSpeed: z.coerce.number().positive("Скорость должна быть больше 0"),
  description: z.string().trim().min(10, "Описание минимум 10 символов"),
  image: z.string().trim().min(1, "Укажите ссылку на фото"),
});

const emptyForm = {
  name: "",
  brand: "",
  type: MOTO_TYPES[0] as string,
  price: "",
  year: "2026",
  engine: "",
  power: "",
  topSpeed: "",
  description: "",
  image: "",
};

type FormState = typeof emptyForm;
type Errors = Partial<Record<keyof FormState, string>>;

function toForm(moto: Moto): FormState {
  return {
    name: moto.name,
    brand: moto.brand,
    type: moto.type,
    price: String(moto.price),
    year: String(moto.year),
    engine: String(moto.engine),
    power: String(moto.power),
    topSpeed: String(moto.topSpeed),
    description: moto.description,
    image: moto.image,
  };
}

function AdminPage() {
  const motos = useMotos();
  const requests = useRequests();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const field =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary";

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Проверьте заполнение полей");
      return;
    }
    setErrors({});
    if (editingId) {
      updateMoto(editingId, result.data);
      toast.success("Мотоцикл обновлён");
    } else {
      addMoto(result.data);
      toast.success("Мотоцикл добавлен в каталог");
    }
    setForm(emptyForm);
    setEditingId(null);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">Админ-панель</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Изменения сохраняются в этом браузере и сразу отображаются в каталоге.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-lg font-bold uppercase">
            {editingId ? "Редактирование модели" : "Новый мотоцикл"}
          </h2>

          {(
            [
              ["name", "Название", "Yamaha MT-09"],
              ["brand", "Бренд", "Yamaha"],
              ["price", "Цена, ₽", "2500000"],
              ["year", "Год", "2026"],
              ["engine", "Объём, см³", "889"],
              ["power", "Мощность, л.с.", "119"],
              ["topSpeed", "Макс. скорость, км/ч", "230"],
              ["image", "Ссылка на фото", "https://…/moto.jpg"],
            ] as const
          ).map(([key, label, placeholder]) => (
            <div key={key}>
              <label htmlFor={key} className="spec-label">
                {label}
              </label>
              <input
                id={key}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className={`${field} mt-1.5`}
              />
              {errors[key] && <p className="mt-1 text-xs text-destructive">{errors[key]}</p>}
            </div>
          ))}

          <div>
            <label htmlFor="type" className="spec-label">
              Тип
            </label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className={`${field} mt-1.5`}
            >
              {MOTO_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="spec-label">
              Описание
            </label>
            <textarea
              id="description"
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="mt-1.5 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-primary"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-md bg-primary px-5 py-2.5 font-display text-sm font-semibold uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              {editingId ? "Сохранить" : "Добавить"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                  setErrors({});
                }}
                className="rounded-md border border-border px-5 py-2.5 text-sm transition-colors hover:bg-accent"
              >
                Отмена
              </button>
            )}
          </div>
        </form>

        <div className="space-y-10">
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold uppercase">
                Мотоциклы ({motos.length})
              </h2>
              <button
                type="button"
                onClick={() => {
                  resetMotos();
                  toast.success("Каталог возвращён к начальному набору");
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <RotateCcw className="size-3.5" /> Сбросить каталог
              </button>
            </div>

            <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              {motos.map((moto) => (
                <li key={moto.id} className="flex items-center gap-3 p-3">
                  <img
                    src={moto.image}
                    alt={moto.name}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold">{moto.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {moto.type} · {moto.year} · {formatPrice(moto.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Редактировать ${moto.name}`}
                    onClick={() => {
                      setEditingId(moto.id);
                      setForm(toForm(moto));
                      setErrors({});
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Удалить ${moto.name}`}
                    onClick={() => {
                      removeMoto(moto.id);
                      if (editingId === moto.id) {
                        setEditingId(null);
                        setForm(emptyForm);
                      }
                      toast.success("Мотоцикл удалён");
                    }}
                    className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold uppercase">
              Заявки ({requests.length})
            </h2>
            {requests.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Пока заявок нет.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {requests.map((r) => (
                  <li key={r.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-sm font-semibold">
                          {r.name} · {r.phone}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Модель: {r.moto} ·{" "}
                          {new Date(r.createdAt).toLocaleString("ru-RU")}
                        </p>
                        {r.comment && <p className="mt-2 text-sm">{r.comment}</p>}
                      </div>
                      <button
                        type="button"
                        aria-label="Удалить заявку"
                        onClick={() => {
                          removeRequest(r.id);
                          toast.success("Заявка удалена");
                        }}
                        className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
