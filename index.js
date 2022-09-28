require("dotenv").config();
const tgBot = require("node-telegram-bot-api");

const bot = new tgBot(process.env.TOKEN, { polling: true });
// const FACT_URL = 'https://cat-fact.herokuapp.com/facts/random';
const FACT_URL = "https://catfact.ninja/fact";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/fact/, (msg) => {
  var request = require("request");

  var options = {
    method: "GET",
    url: FACT_URL,
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    bot.sendMessage(msg.chat.id, body.fact);
  });
});
