import TelegramBot from "node-telegram-bot-api";
import { start } from "./start";
import { subscribeCommand } from "./subscribe";
import { unsubscribe } from "./unsubscribe";
import { clearskills } from "./clearskills";
import { myskills } from "./myskills";
import { search } from "./search";

export function commands(bot: TelegramBot) {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      return start(chatId, bot);
    }

    if (text === "/subscribe") {
      return subscribeCommand(chatId, bot);
    }

    if (text === "/unsubscribe") {
      return unsubscribe(chatId, bot);
    }

    if (text === "/clearskills") {
      return clearskills(chatId, bot);
    }

    if (text === "/myskills") {
      return myskills(chatId, bot);
    }

    if (text === "/search") {
      return search(chatId, bot);
    }
  });
}
