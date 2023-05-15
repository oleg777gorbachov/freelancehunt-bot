import TelegramBot from "node-telegram-bot-api";
import { skillsFilter } from "../utils/skills";

export async function search(chatId: number, bot: TelegramBot) {
  bot.once("message", async (msg) => {
    const text = msg.text || "";

    const items = await skillsFilter(text);
    if (!items.length) {
      return bot.sendMessage(
        chatId,
        "Нажаль я нічого не зміг знайти по вашому запиту"
      );
    }
    return bot.sendMessage(chatId, "Ось що я знайшов по вашому запиту", {
      reply_markup: {
        inline_keyboard: items.map((e) => [
          { text: e.name, callback_data: "Підписка " + e.id },
        ]),
      },
    });
  });

  return bot.sendMessage(chatId, "Напишіть ключове слово");
}
