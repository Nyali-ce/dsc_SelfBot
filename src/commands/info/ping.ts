import sendMessage from "../../functions/utils/sendMessage.js";

export default {
    name: 'ping',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        sendMessage(message.channel_id, 'Pong!')
    },
}
