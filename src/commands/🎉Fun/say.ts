import sendMessage from "../../functions/api/sendMessage.js";

export default {
    name: 'say',
    description: 'Make the bot say something.',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        const text = args.join(' ');

        sendMessage(message.channel_id, text);
    }
}
