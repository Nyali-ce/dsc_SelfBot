import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";

export default {
    name: 'ping',
    description: 'Get the bot\'s ping.',
    permission: 'ADMINISTRATOR',
    run: async (client: Client, message: Message, args: string[]) => {
        const startTime = Date.now()

        const res = await message.channel.send('Pinging...')

        const endTime = Date.now()

        await res.edit(`Pong! \`${endTime - startTime}ms\``)
    },
}
