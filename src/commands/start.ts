import TelegramBot from "node-telegram-bot-api";
import { stringSplit } from "../utils";

export function start(chatId: number, bot: TelegramBot) {
  return bot.sendMessage(
    chatId,
    stringSplit([
      `Привіт, я бот який буде повідомляти про нові проєкти на платформі FreelanceHunt`,
      `Для того щоб підписатися на розсилку веди команду /subscribe`,
    ]),
    {
      reply_markup: {
        inline_keyboard: [[{ text: "Підписатись", callback_data: "Підписка" }]],
      },
    }
  );
}
