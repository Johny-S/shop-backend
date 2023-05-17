const TelegramBot = require("node-telegram-bot-api");

const token = "6135373501:AAFw6kv94iuQi6WR4JDabf8aod6fZ0jrnHo";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Заполните форму",
            },
          ],
        ],
        inline_keyboard: [
          [
            {
              text: "Сделать заказ",
              web_app: {url: '/'},
            },
          ],
        ],
      },
    });
  }
});
