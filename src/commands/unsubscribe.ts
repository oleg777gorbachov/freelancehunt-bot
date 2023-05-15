import TelegramBot from "node-telegram-bot-api";
import user from "../models/user";

export async function unsubscribe(chatId: number, bot: TelegramBot) {
  const model = await user.findOne({ chatId });
  if (!model) {
    return bot.sendMessage(
      chatId,
      "Ви ще не користувались нашим сервісом, тому немає що вимикати"
    );
  }

  if (!model.state) {
    return bot.sendMessage(
      chatId,
      "У вас вимкнені повідомлення, якщо ви хочете увімкнути повідомлення жміть на кнопку нажче",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Підписатись", callback_data: "Підписка-увімкнути" }],
          ],
        },
      }
    );
  }

  model.state = false;
  await model.save();

  return bot.sendMessage(
    chatId,
    "Повідомлення вимкнені, якщо ви захочете знову увімкнути повідомлення напишіть знову ж ту саму команду /unsubscribe"
  );
}
