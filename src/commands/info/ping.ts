import sendMessage from "../../functions/utils/sendMessage.js";
import editMessage from "../../functions/utils/editMessage.js";

export default {
    name: 'ping',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        const startTime = Date.now()

        await sendMessage(message.channel_id, 'Pong!');

        const endTime = Date.now()

        const timeDifference = endTime - startTime;

        editMessage(message.channel_id, message.id, `Pong! Took ${timeDifference}ms to respond.`)
    },
}
