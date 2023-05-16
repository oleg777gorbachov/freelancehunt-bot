import TelegramBot from "node-telegram-bot-api";
import { pagination } from "./pagination";
import { subscribe } from "./subscribe";
import { sleepEvent } from "./sleep";

export function events(bot: TelegramBot) {
  bot.on("callback_query", (event) => {
    pagination(event, bot);
    subscribe(event, bot);
    sleepEvent(event, bot);
  });
}
