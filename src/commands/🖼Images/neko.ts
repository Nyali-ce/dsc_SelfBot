import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from "node-fetch";

export default {
    name: 'neko',
    description: 'Get a random neko image.',
    permission: 'ADMINISTRATOR',
    run: async (client: Client, message: Message, args: string[]) => {
        const res: any = await fetch('https://nekos.life/api/v2/img/neko');
        const img: string = (await res.json()).url;

        message.channel.send(img)
    }
}
