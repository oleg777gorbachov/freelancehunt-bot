import TelegramBot from "node-telegram-bot-api";
import { skills } from "../utils/skills";
import { stringSplit } from "../utils";

export async function subscribeCommand(
  chatId: number,
  bot: TelegramBot,
  pages = 0
) {
  const { items, isEnd, page } = await skills(pages);
  const inline_keyboard: TelegramBot.InlineKeyboardButton[][] = [
    [
      {
        text: "Пошук 🔎",
        callback_data: "Пошук",
      },
    ],
  ];

  items.forEach((e) =>
    inline_keyboard.push([{ text: e.name, callback_data: "Підписка " + e.id }])
  );

  if (page !== 0 && !isEnd) {
    inline_keyboard.push([
      {
        text: "⏮️ Попередня сторінка",
        callback_data: "Попередня сторінка " + page,
      },
      {
        text: "Наступна сторінка ⏭️",
        callback_data: "Наступна сторінка " + page,
      },
    ]);
  } else if (page !== 0) {
    inline_keyboard.push([
      {
        text: "⏮️ Попередня сторінка",
        callback_data: "Попередня сторінка " + page,
      },
    ]);
  } else {
    inline_keyboard.push([
      {
        text: "Наступна сторінка ⏭️",
        callback_data: "Наступна сторінка " + page,
      },
    ]);
  }

  return bot.sendMessage(
    chatId,
    stringSplit([
      `Привіт, я бот який буде повідомляти про нові проєкти на платформі FreelanceHunt`,
      `Для того щоб відпідписатися на розсилку веди команду /unsubscribe`,
    ]),
    {
      reply_markup: {
        inline_keyboard,
      },
    }
  );
}
