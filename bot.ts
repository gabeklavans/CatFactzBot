import { Bot } from "https://deno.land/x/grammy@v1.33.0/mod.ts";

// const FACT_URL = 'https://cat-fact.herokuapp.com/facts/random';
const FACT_URL = "https://catfact.ninja/fact";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(Deno.env.get("BOT_TOKEN") ?? ""); // <-- put your bot token between the ""

bot.command("start", (ctx) => ctx.reply("Welcome! Up and meowing."));
bot.command("fact", async (ctx) => {
  const res = await fetch(FACT_URL, {
    headers: {
      accept: "application/json",
    },
  });

  const resJson = await res.json();

  ctx.reply(resJson.fact);
});

bot.start();
