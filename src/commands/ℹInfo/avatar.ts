import User from "../../functions/parser/user.js";

export default {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
    permission: 'ADMINISTRATOR',
    run: async (client: any, message: any, args: any) => {
        const userData = message.mentions[0] || message.author

        const user = new User({ id: userData.id, avatar: userData.avatar });

        const avatar = user.avatar
            ? user.displayAvatarURL(1024)
            : undefined;

        if (!avatar) return message.channel.send('No avatar found.');

        message.channel.send(avatar);
    }
}