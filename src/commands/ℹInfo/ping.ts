import sendMessage from "../../functions/api/sendMessage.js";
import editMessage from "../../functions/api/editMessage.js";

export default {
    name: 'ping',
    description: 'Get the bot\'s ping.',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        const startTime = Date.now()

        const res = await sendMessage(message.channel_id, 'Pinging...')

        const endTime = Date.now()

        await editMessage(message.channel_id, res.id, `Pong! \`${endTime - startTime}ms\``)
    },
}
