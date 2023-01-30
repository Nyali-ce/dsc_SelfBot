import sendMessage from "../../functions/utils/sendMessage.js";
import editMessage from "../../functions/utils/editMessage.js";

export default {
    name: 'ping',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        const startTime = Date.now()

        const res = await sendMessage(message.channel_id, 'Pinging...')

        const endTime = Date.now()

        await editMessage(message.channel_id, res.id, `Pong! \`${endTime - startTime}ms\``)
    },
}
