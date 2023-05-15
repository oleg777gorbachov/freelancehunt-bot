import Keys from "./keys";
import TelegramBot from "node-telegram-bot-api";
import user from "./models/user";
import { commands } from "./commands";
import { events } from "./events";
import { getProjects } from "./utils/skills";
import { stringSplit } from "./utils";
import "./db/clearDB";
import "./db";

const bot = new TelegramBot(Keys.token_telegram, { polling: true });

events(bot);
commands(bot);

bot.setMyCommands([
  {
    command: "/start",
    description: "Почати взяємодію з ботом",
  },
  {
    command: "/subscribe",
    description: "Підписка на фриланс проєкти",
  },
  {
    command: "/unsubscribe",
    description: "Відписка від повідомлень",
  },
  {
    command: "/clearskills",
    description: "Очистка вибраних навичок",
  },
  {
    command: "/myskills",
    description: "Список ваших навичок",
  },
  {
    command: "/search",
    description: "Пошук доступних навичок",
  },
]);

setInterval(async () => {
  const models = await user.find();
  const projects = await getProjects();

  if (!projects) return;

  for (let key of models) {
    if (key.skills.length >= 1) {
      const filtered = projects?.data.filter((e) => {
        let isSkilled = false;
        e.attributes.skills.forEach((e) =>
          key.skills.includes(e.id) ? (isSkilled = true) : null
        );
        return isSkilled && !key.notified.includes(e.id);
      });

      filtered?.forEach((e) => {
        key.notified.push(e.id);
        bot.sendMessage(
          key.chatId!,
          stringSplit([
            "*З'явився новий проект!*",
            `Назва *${e.attributes.name}*`,
            e.attributes.budget
              ? `Ціна *${e.attributes.budget.amount} ${
                  e.attributes.budget.currency
                }*\nНавички*${e.attributes.skills.map((e) => " " + e.name)}*`
              : `Навички*${e.attributes.skills.map((e) => " " + e.name)}*`,
            ``,
            e.links.self.web,
          ]),

          {
            parse_mode: "Markdown",
          }
        );
      });
    }
    key.save();
  }
}, 60 * 1000);
