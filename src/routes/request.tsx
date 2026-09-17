import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { addRequest, useMotos } from "@/lib/moto-store";
import { sendRequestToTelegram } from "@/lib/telegram.functions";

export const Route = createFileRoute("/request")({
  validateSearch: (search: Record<string, unknown>): { moto?: string } => {
    const moto = search["moto"];
    return typeof moto === "string" && moto.length > 0 ? { moto } : {};
  },
  head: () => ({
    meta: [
      { title: "Оставить заявку на мотоцикл — MotoDrive" },
      {
        name: "description",
        content:
          "Заполните заявку на покупку мотоцикла в MotoDrive: имя, телефон, модель и комментарий.",
      },
      { property: "og:title", content: "Заявка на мотоцикл — MotoDrive" },
      {
        property: "og:description",
        content: "Оставьте контакты, и менеджер MotoDrive свяжется с вами.",
      },
    ],
  }),
  component: RequestPage,
});

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя (минимум 2 символа)")
    .max(60, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .min(6, "Укажите телефон")
    .max(20, "Слишком длинный номер")
    .regex(/^[+\d][\d\s()-]{5,19}$/, "Телефон в формате +7 700 000 00 00"),
  moto: z.string().trim().min(1, "Выберите модель"),
  comment: z.string().trim().max(500, "Комментарий до 500 символов"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function RequestPage() {
  const { moto: presetMoto } = Route.useSearch();
  const motos = useMotos();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    moto: presetMoto ?? "",
    comment: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const notifyTelegram = useServerFn(sendRequestToTelegram);

  const field =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Проверьте заполнение формы");
      return;
    }
    setErrors({});
    setSending(true);
    addRequest(result.data);
    try {
      const res = await notifyTelegram({ data: result.data });
      if (res.ok) {
        toast.success("Заявка отправлена! Менеджер свяжется с вами в ближайшее время.");
      } else {
        toast.warning("Заявка сохранена, но уведомление в Telegram не отправилось.");
      }
    } catch {
      toast.warning("Заявка сохранена, но уведомление в Telegram не отправилось.");
    } finally {
      setSending(false);
      setForm({ name: "", phone: "", moto: "", comment: "" });
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">Оставить заявку</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Заполните форму — менеджер MotoDrive перезвонит, уточнит детали и предложит тест-драйв.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6">
        <div>
          <label htmlFor="name" className="spec-label">
            Имя
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Даниель"
            className={`${field} mt-2`}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="spec-label">
            Телефон
          </label>
          <input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+7 700 000 00 00"
            className={`${field} mt-2`}
          />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="moto" className="spec-label">
            Модель
          </label>
          <select
            id="moto"
            value={form.moto}
            onChange={(e) => setForm({ ...form, moto: e.target.value })}
            className={`${field} mt-2`}
          >
            <option value="">Выберите мотоцикл</option>
            {motos.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
          {errors.moto && <p className="mt-1 text-xs text-destructive">{errors.moto}</p>}
        </div>

        <div>
          <label htmlFor="comment" className="spec-label">
            Комментарий
          </label>
          <textarea
            id="comment"
            rows={4}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            placeholder="Удобное время звонка, вопросы по рассрочке или trade-in"
            className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-primary"
          />
          {errors.comment && <p className="mt-1 text-xs text-destructive">{errors.comment}</p>}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="glow w-full rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold uppercase text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {sending ? "Отправляем…" : "Отправить заявку"}
        </button>
      </form>
    </div>
  );
}
