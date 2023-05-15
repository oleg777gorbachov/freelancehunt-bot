import TelegramBot from "node-telegram-bot-api";
import { subscribeCommand } from "../commands/subscribe";
import user from "../models/user";
import { getSkillById } from "../utils/skills";

export async function subscribe(
  msg: TelegramBot.CallbackQuery,
  bot: TelegramBot
) {
  const text = msg.data || "";
  const chatId = msg.from.id;

  if (text === "Підписка") {
    return subscribeCommand(chatId, bot);
  }

  if (text === "Підписка-увімкнути") {
    const chat = await user.findOne({ chatId });
    if (!chat) {
      return bot.sendMessage(
        chatId,
        "Сталася помилка, я не зміг знайти ваші данні"
      );
    }
    chat.state = true;
    chat.save();
    return bot.sendMessage(chatId, "Повідомлення увімкненні!");
  }

  if (text.startsWith("Видалити ")) {
    const model = await user.findOne({ chatId });
    const data = +msg.data?.split(" ")[1]!;

    if (!model) {
      return bot.sendMessage(chatId, "У вас немає данної навички у списку!");
    }

    model.skills = model.skills.filter((e) => e !== data);
    await model.save();

    const skill = await getSkillById(data);

    return bot.sendMessage(
      chatId,
      `Навчика *${skill?.name}* була видалена з вашого списку`,
      { parse_mode: "Markdown" }
    );
  }

  if (text.startsWith("Підписка-видалити ")) {
    let model = await user.findOne({ chatId });
    const data = +msg.data?.split(" ")[1]!;

    const skill = await getSkillById(data);

    if (!model || model.skills.includes(data)) {
      return bot.sendMessage(
        chatId,
        "У ваших вибраних навичках немає " + skill?.name
      );
    }

    model.skills = model.skills.filter((e) => e !== data);
    await model.save();

    return bot.sendMessage(
      chatId,
      `Навичка ${skill?.name} була видалена з вашого списку повідомлень`
    );
  }

  if (text.startsWith("Підписка ")) {
    let model = await user.findOne({ chatId });
    const data = +msg.data?.split(" ")[1]!;

    if (!model) {
      model = await new user({
        chatId,
      }).save();
    }

    if (model.skills.includes(data)) {
      return bot.sendMessage(
        chatId,
        "Ви уже маєте данний навик у вашому списку",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Видалити",
                  callback_data: "Підписка-видалити " + data,
                },
              ],
            ],
          },
        }
      );
    }
    model.skills.push(data);
    await model.save();
    const skill = await getSkillById(data);
    return bot.sendMessage(
      chatId,
      `Навичка *${skill?.name}* була добавлена у ваш список повідомлень`,
      { parse_mode: "Markdown" }
    );
  }
}
