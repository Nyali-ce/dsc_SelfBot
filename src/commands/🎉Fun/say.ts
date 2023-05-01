import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";

const run = async (client: Client, message: Message, args: string[]) => {
    const text = args.join(' ');

    message.channel.send(text);
}

export default {
    name: 'say',
    description: 'Make the bot say something.',
    permission: 'ADMINISTRATOR',
    run
}
