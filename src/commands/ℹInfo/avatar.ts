import User from "../../functions/parser/user.js";

export default {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
    permission: 'ADMINISTRATOR',
    run: async (client: any, message: any, args: any) => {
        const userData: any = message.mentions[0] || message.author

        const user: User = new User({ id: userData.id, avatar: userData.avatar });

        const avatar: string | undefined = user.avatar
            ? user.displayAvatarURL(1024)
            : undefined;

        if (!avatar) return message.channel.send('No avatar found.');

        message.channel.send(avatar);
    }
}