import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import Permission from "../../enums/Permission.js";


const run = async (client: Client, message: Message, args: string[]) => {
    await message.channel.send(`Stopping \`pid${process.pid}\` on \`${process.env.OS}\``);

    client.ws.close();
    process.exit();
}

export default {
    name: 'stop',
    description: 'Stops the bot',
    permission: Permission.OWNER,
    run
}