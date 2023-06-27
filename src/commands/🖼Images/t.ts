import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from "node-fetch";

const run = async (client: Client, message: Message, args: string[]) => {
    const res: any = await fetch('https://api.waifu.pics/nsfw/trap')

    const img: string = (await res.json()).url;

    // message.channel.send(img)
}

export default {
    name: 't',
    description: 'Get a random test image.',
    permission: 'OWNER',
    run
}
