const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = "6135373501:AAFw6kv94iuQi6WR4JDabf8aod6fZ0jrnHo";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

const webAppUrl = "https://master--fluffy-crisp-b2511f.netlify.app";
// const webAppUrl = "https://www.youtube.com";

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
              web_app: { url: webAppUrl + "/form" },
            },
          ],
        ],
      },
    });
    await bot.sendMessage(chatId, "Заходи в наш магазин по ссылке", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Сделать заказ",
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      const { country, city, subject } = data;
      await bot.sendMessage(chatId, "Спасибо за отклик!");
      await bot.sendMessage(chatId, `Ваши данные зафиксированы: ${country} ${city} ${subject}`);
      setTimeout(async () => {
        await bot.sendMessage(chatId, "До новых встреч!");
      }, 3e3);
    } catch (e) {
      console.log(e);
    }
  }
});

app.post("/web-data", async (req, res) => {
  const { queryId, products = [], totalPrice } = req.body;
  // console.log(req.body);
  try {
    // await bot.sendMessage(queryId, "До новых встреч!");
    // await bot.answerWebAppQuery(queryId, {
    //   type: "article",
    //   id: queryId,
    //   title: "Успешная покупка",
    //   input_message_content: {
    //     message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products
    //       .map((item) => item.title)
    //       .join(", ")}`,
    //   },
    // });
    return res.status(200).json({...req.body});
  } catch (e) {
    return res.status(500).json({});
  }
});

const PORT = "8000";
app.listen(PORT, () => console.log("Server started on " + PORT));
