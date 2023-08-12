import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from "node-fetch";
import Permission from "../../enums/Permission.js";

const run = async (client: Client, message: Message, args: string[]) => {
    // const category: any = await fetch('https://api.nekosapi.com/v2/categories/e9682ae3-a64b-4671-866d-3726d1d1d816');

    // const data = await category.json();

    // const res: any = await fetch(`https://api.nekosapi.com/v2/images/${data.data.relationships.images.data[Math.floor(Math.random() * data.data.relationships.images.data.length | 0)].id}`)

    const res: any = await fetch('https://api.waifu.pics/sfw/neko')

    // const img: string = (await res.json()).data.attributes.file;
    const img: string = (await res.json()).url;

    message.channel.send(img)
}

export default {
    name: 'neko2',
    description: 'Get a random neko image.',
    permission: Permission.EVERYONE,
    run
}
