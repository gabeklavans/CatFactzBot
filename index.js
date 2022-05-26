// jshint esversion: 6
require('dotenv').config();
const tgBot = require('node-telegram-bot-api');

const bot = new tgBot(process.env.TOKEN, { polling: true });
// const FACT_URL = 'https://cat-fact.herokuapp.com/facts/random';
const FACT_URL = 'https://catfact.ninja/fact';

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome");

});

bot.onText(/\/fact/, (msg) => {
    var request = require("request");

    var options = {
        method: 'GET',
        // url: 'https://catfact.ninja/fact',
	url: FACT_URL,
        headers:
        {
            //Host: 'catfact.ninja',
	    //Host: 'cat-fact.herokuapp'
        },
        json: true,
	//rejectUnauthorized: false
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        bot.sendMessage(msg.chat.id, body.fact);
    });

});

// Some other client. I would use it but it has pretty bad API documentation

// const Telegraf = require('telegraf');

// const bot = new Telegraf(process.env.TOKEN);
// bot.start((ctx) => ctx.reply('Welcome!'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));

// bot.command('echo', ctx => ctx.reply(`Did you say '${ctx.message.text}'?`));

// bot.launch();
// console.log('Bot launched!');
