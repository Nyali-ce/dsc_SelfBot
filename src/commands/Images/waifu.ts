import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from "node-fetch";
import Permission from "../../enums/Permission.js";

const run = async (client: Client, message: Message, args: string[]) => {
  const categories = [
    "waifu",
    "neko",
    "shinobu",
    "megumin",
    "bully",
    "cuddle",
    "cry",
    "hug",
    "awoo",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe",
  ];

  let category = categories.find((c) => c === args[0]) || "waifu";

  const res: any = await fetch(`https://api.waifu.pics/sfw/${category}`);

  const img: string = (await res.json()).url;

  message.channel.send(img);
};

export default {
  name: "waifu",
  description: "Get a waifu image.",
  permission: Permission.ADMINISTRATOR,
  run,
};
