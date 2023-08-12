import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from "node-fetch"
import Permission from "../../enums/Permission.js";

const run = (client: Client, message: Message, args: string[]) => {
    const url = `https://discord.com/api/v9/channels/${message.channelId}`

    const headers = {
        'authorization': client.USER_TOKEN,
        'content-type': 'application/json',
    }

    fetch(url, {
        method: 'GET',
        headers: headers,
    }
    ).then(res => res.json()).then(json => console.log(json))
}

export default {
    name: 'getchannel',
    description: 'test command',
    permission: Permission.ADMINISTRATOR,
    run
}