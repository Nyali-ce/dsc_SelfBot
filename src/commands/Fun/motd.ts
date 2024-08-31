import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from 'node-fetch';
import Permission from "../../enums/Permission.js";

const run = async (client: Client, message: Message, args: string[]) => {
    const text = args.join(' ');

    if (!text) return message.channel.send('Please provide a message.');

    const res = await fetch(`http://localhost:80/api/motd`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            motd: text
        })
    });

    if (res.status !== 200) return message.channel.send('Something went wrong.');

}

export default {
    name: 'motd',
    description: 'Change the message on my background.',
    permission: Permission.EVERYONE,
    run
}
