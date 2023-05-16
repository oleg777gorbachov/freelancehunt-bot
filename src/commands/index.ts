import TelegramBot from "node-telegram-bot-api";
import { start } from "./start";
import { subscribeCommand } from "./subscribe";
import { unsubscribe } from "./unsubscribe";
import { clearskills } from "./clearskills";
import { myskills } from "./myskills";
import { search } from "./search";
import { sleep } from "./sleep";
import { utc } from "./utc";
import { sleepRemove } from "./sleepremove";
import { profile } from "./profile";

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

    if (text === "/sleep") {
      return sleep(chatId, bot);
    }

    if (text === "/utc") {
      return utc(chatId, bot);
    }

    if (text === "/sleepremove") {
      return sleepRemove(chatId, bot);
    }

    if (text === "/profile") {
      return profile(chatId, bot);
    }
  });
}
