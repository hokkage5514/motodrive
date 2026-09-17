import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CHAT_ID = "8621030766";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(60),
  phone: z.string().trim().min(6).max(20),
  moto: z.string().trim().min(1).max(120),
  comment: z.string().trim().max(500),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const sendRequestToTelegram = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    if (!token) {
      console.error("TELEGRAM_BOT_TOKEN is not configured");
      return { ok: false as const, error: "not_configured" };
    }

    const text = [
      "<b>Новая заявка — MotoDrive</b>",
      `Имя: ${escapeHtml(data.name)}`,
      `Телефон: ${escapeHtml(data.phone)}`,
      `Мотоцикл: ${escapeHtml(data.moto)}`,
      data.comment ? `Комментарий: ${escapeHtml(data.comment)}` : "Комментарий: —",
    ].join("\n");

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
      });

      const body = await response.text();
      if (!response.ok) {
        console.error(`Telegram sendMessage failed [${response.status}]: ${body}`);
        return { ok: false as const, error: "send_failed" };
      }

      const payload = JSON.parse(body) as { ok?: boolean; description?: string };
      if (!payload.ok) {
        console.error(`Telegram sendMessage rejected: ${payload.description ?? body}`);
        return { ok: false as const, error: "send_failed" };
      }

      return { ok: true as const };
    } catch (error) {
      console.error("Telegram request error", error);
      return { ok: false as const, error: "network_error" };
    }
  });
