import TelegramBot from "node-telegram-bot-api";
import { stringSplit } from "../utils";
import user from "../models/user";
import { sleepRemove } from "./sleepremove";

export async function sleep(chatId: number, bot: TelegramBot) {
  const model = await user.findOne({ chatId });

  if (model && model.sleep) {
    if (model.sleep === "null") {
      return bot.sendMessage(
        chatId,
        stringSplit([
          `У вас немає режиму графіку для вимкнених повідомлень`,
          "Якщо Ви хочете змінити цей графік натисніть на кнопки нижче",
        ]),
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Змінити",
                  callback_data: "Сон-зміна",
                },
              ],
            ],
          },
        }
      );
    }

    const [PM, AM] = model.sleep.split("-");
    return bot.sendMessage(
      chatId,
      stringSplit([
        `Ви не будете отримувати повідомлення від ${PM} годин вечора до ${AM} годин ранку`,
        "Якщо Ви хочете змінити цей графік натисніть на кнопки нижче",
      ]),
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Змінити",
                callback_data: "Сон-зміна",
              },
            ],
          ],
        },
      }
    );
  }

  return bot.sendMessage(
    chatId,
    stringSplit([
      "Напишіть час коли не хочете отримувати сповіщення від сервісу",
      "Наприклад: 23-7",
      "Від 23 вечора до 7 ранку, я не буду отримувати сповіщень",
    ])
  );
}

export async function catchMsg(
  msg: TelegramBot.Message,
  bot: TelegramBot,
  chatId: number
) {
  const [PM, AM] = msg.text?.trim().split("-")!;

  if (msg.text === "/sleepremove") {
    return sleepRemove(chatId, bot);
  }

  if (
    Number.isNaN(+PM) ||
    Number.isNaN(+AM) ||
    PM.length > 2 ||
    AM.length > 2
  ) {
    return bot.sendMessage(
      chatId,
      stringSplit([
        "Ви неправильно вели дату, щоб повторити запит натисніть кнопку нижче",
      ]),
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Повторити", callback_data: "Сон-зміна" }],
          ],
        },
      }
    );
  }

  const model = await user.findOne({ chatId });

  if (!model) {
    await new user({
      chatId,
      sleep: `${PM}-${AM}`,
    }).save();
  } else {
    model.sleep = `${PM}-${AM}`;
    await model.save();
  }

  return bot.sendMessage(
    chatId,
    `Теперь від ${PM} години вечора до ${AM} години ранку Ви не будете отримувати сповіщення`
  );
}
