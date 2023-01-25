import sendMessage from "../../functions/utils/sendMessage.js";

export default {
    name: 'ping',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        sendMessage(message.channel_id, 'Pong!')

        // TODO: add actual ping in ms
        // ? send message, then edit message and get time difference between sending and editing
    },
}
