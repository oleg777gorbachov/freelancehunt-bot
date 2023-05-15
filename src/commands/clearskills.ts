import TelegramBot from "node-telegram-bot-api";
import user from "../models/user";
import { getSkillById } from "../utils/skills";

export async function clearskills(chatId: number, bot: TelegramBot) {
  const model = await user.findOne({ chatId });
  if (!model || !model.skills.length) {
    return bot.sendMessage(chatId, "Нажаль у вас немає збережених навичок");
  }

  const keyboard: TelegramBot.InlineKeyboardButton[][] = [];

  for (let key of model.skills) {
    const skill = await getSkillById(key);
    if (skill) {
      keyboard.push([{ text: skill.name, callback_data: "Видалити " + key }]);
    }
  }

  return bot.sendMessage(chatId, "Натисніть на навик щоб видалити його", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
}
