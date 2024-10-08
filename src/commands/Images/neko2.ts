import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from "node-fetch";
import Permission from "../../enums/Permission.js";

const run = async (client: Client, message: Message, args: string[]) => {
    const res: any = await fetch('https://api.waifu.pics/sfw/neko')

    const img: string = (await res.json()).url;

    message.channel.send(img)
}

export default {
    name: 'neko2',
    description: 'Get a random neko image.',
    permission: Permission.ADMINISTRATOR,
    run
}
