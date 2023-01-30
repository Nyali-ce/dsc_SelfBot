import sendMessage from "../../functions/utils/sendMessage.js"

export default {
    name: 'avatar',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        const user = message.mentions[0] || message.author

        const avatar = user.avatar
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
            : undefined;

        if (!avatar) return sendMessage(message.channel_id, 'No avatar found.');

        sendMessage(message.channel_id, avatar);
    }
}