import TelegramBot from "node-telegram-bot-api";
import user from "../models/user";
import { stringSplit } from "../utils";

export async function profile(chatId: number, bot: TelegramBot) {
  const model = await user.findOne({ chatId });

  if (!model) {
    return bot.sendMessage(chatId, "Ви не маєте налаштованного профілю");
  }

  return bot.sendMessage(
    chatId,
    stringSplit([
      `${model.state ? "🟢" : "🔴"} *Профиль*`,
      `Активний: *${model.state ? "так" : "ні"}*`,
      `Ваш ID: *${chatId}*`,
      `Графік: *${
        model.sleep === "null" ? "немає" : `${model.sleep.replace(/-/g, `\-`)}`
      }*`,
      `Навички: /myskills`,
      `UTC: *UTC${model.utc > 0 ? `\+` : `\-`}${model.utc}*`,
    ]),
    {
      parse_mode: "Markdown",
    }
  );
}
