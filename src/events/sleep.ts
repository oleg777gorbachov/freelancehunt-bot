import TelegramBot from "node-telegram-bot-api";
import { catchMsg } from "../commands/sleep";
import { stringSplit } from "../utils";
import user from "../models/user";

export async function sleepEvent(
  msg: TelegramBot.CallbackQuery,
  bot: TelegramBot
) {
  const text = msg.data || "";
  const chatId = msg.from.id;

  if (text === "Сон-зміна") {
    bot.once("message", (msg) => catchMsg(msg, bot, chatId));
    return bot.sendMessage(
      chatId,
      stringSplit([
        "Будь ласка, напишіть час в який ",
        "Ви не хочете отримувати повідомлення",
        "Наприклад: 23-7 від 24 годин вечора до 7 годин ранку",
        "Користувач не буде отримувати повідомлення",
        "Якщо ви хочете видалити цей графік напишіть /sleepremove",
      ])
    );
  }

  if (text === "UTC-зміна") {
    bot.once("message", async (msg) => {
      const text = +msg.text?.trim()!;

      if (Number.isNaN(text) || text > 14 || text < -12) {
        return bot.sendMessage(
          chatId,
          stringSplit([
            "Ви неправильно вели часовий пояс",
            "Часовий пояс повинен бути від -12 до +14",
            "Щоб повторити нажміть на кнопку",
          ]),
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Повторити", callback_data: "UTC-зміна" }],
              ],
            },
          }
        );
      }

      const model = await user.findOne({ chatId });
      if (!model) {
        await new user({
          chatId,
          utc: text,
        }).save();
      } else {
        model.utc = text;
        await model.save();
      }

      return bot.sendMessage(
        chatId,
        `Ви змінили свій часовий пояс на UTC${text > 0 ? "+" : "-"}${text}`
      );
    });

    return bot.sendMessage(
      chatId,
      "Будь ласка, напишіть ваш часовий пояс у вигляді типу '+3' або '-3'"
    );
  }
}
