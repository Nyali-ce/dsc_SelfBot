import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import Permission from "../../enums/Permission.js";

const run = async (client: Client, message: Message, args: string[]) => {
    const text = args.join(' ');


    if (!text) return message.channel.send('Please provide some text to say.');

    if (text.includes('@everyone') || text.includes('@here')) return message.channel.send('You can\'t make me ping everyone.');

    if (text.startsWith(`${client.prefix}`)) return message.channel.send('You can\'t make me execute a command.');

    message.channel.send(text);
}

export default {
    name: 'say',
    description: 'Make the bot say something.',
    permission: Permission.ADMINISTRATOR,
    run
}
