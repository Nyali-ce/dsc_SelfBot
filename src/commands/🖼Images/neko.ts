import fetch from "node-fetch";
import sendMessage from "../../functions/api/sendMessage.js";

export default {
    name: 'neko',
    description: 'Get a random neko image.',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        const res: any = await fetch('https://nekos.life/api/v2/img/neko');
        const img: string = (await res.json()).url;

        sendMessage(message.channel_id, img)
    }
}
