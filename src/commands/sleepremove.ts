import TelegramBot from "node-telegram-bot-api";
import user from "../models/user";

export async function sleepRemove(chatId: number, bot: TelegramBot) {
  const model = await user.findOne({ chatId });

  if (model) {
    model.sleep = "null";
    await model.save();
  } else {
    await new user({
      chatId,
      sleep: "null",
    }).save();
  }

  return bot.sendMessage(
    chatId,
    "Ви видалили графік, теперь ви будете отримовувати сповіщення цілодобово"
  );
}
