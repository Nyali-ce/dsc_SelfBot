import fetch from "node-fetch";

export default {
    name: 'neko',
    description: 'Get a random neko image.',
    permission: 'ADMINISTRATOR',
    run: async (client: any, message: any, args: string[]) => {
        const res: any = await fetch('https://nekos.life/api/v2/img/neko');
        const img: string = (await res.json()).url;

        message.channel.send(img)
    }
}
