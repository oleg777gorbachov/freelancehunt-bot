import TelegramBot from "node-telegram-bot-api";
import user from "../models/user";
import { getSkillById } from "../utils/skills";

export async function myskills(chatId: number, bot: TelegramBot) {
  const model = await user.findOne({ chatId });
  if (!model || !model.skills.length) {
    return bot.sendMessage(chatId, "У вас немає ніяких навиков");
  }

  let skills = "";

  for (let key of model.skills) {
    const skill = await getSkillById(key);
    if (skill) skills += "\n" + skill.name;
  }

  return bot.sendMessage(chatId, "Вибрані навички: " + skills);
}
