import TelegramBot from "node-telegram-bot-api";
import { subscribeCommand } from "../commands/subscribe";
import { search } from "../commands/search";

export async function pagination(
  msg: TelegramBot.CallbackQuery,
  bot: TelegramBot
) {
  const text = msg.data || "";
  const chatId = msg.from.id;

  const msgId = msg.message?.message_id!;

  if (text.startsWith("Попередня сторінка")) {
    const page = +text.split(" ")[2];
    await bot.deleteMessage(chatId, msgId);
    return subscribeCommand(chatId, bot, page - 1);
  }

  if (text.startsWith("Наступна сторінка")) {
    const page = +text.split(" ")[2];
    await bot.deleteMessage(chatId, msgId);
    return subscribeCommand(chatId, bot, page + 1);
  }

  if (text === "Пошук") {
    return search(chatId, bot);
  }
}
