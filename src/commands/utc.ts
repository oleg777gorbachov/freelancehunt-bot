import TelegramBot from "node-telegram-bot-api";
import user from "../models/user";

export async function utc(chatId: number, bot: TelegramBot) {
  const model = await user.findOne({ chatId });
  if (model) {
    return bot.sendMessage(
      chatId,
      `У вас встановленний UTC${model.utc > 0 ? "+" : "-"}${
        model.utc
      }, якщо Ви хочете змінити його натисніть кнопку ниже`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Змінити",
                callback_data: "UTC-зміна",
              },
            ],
          ],
        },
      }
    );
  }
  return bot.sendMessage(
    chatId,
    `У вас встановленний UTC+3, якщо Ви хочете змінити його натисніть кнопку ниже`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Змінити",
              callback_data: "UTC-зміна",
            },
          ],
        ],
      },
    }
  );
}
