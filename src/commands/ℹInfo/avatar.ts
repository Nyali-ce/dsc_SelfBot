import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import User from "../../functions/api/user.js";

export default {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
    permission: 'ADMINISTRATOR',
    run: async (client: Client, message: Message, args: string[]) => {
        const user: User = message.mentions[0] || message.author

        const avatar: string | undefined = user.avatar
            ? user.displayAvatarURL(1024)
            : undefined;

        if (!avatar) return message.channel.send('No avatar found.');

        message.channel.send(avatar);
    }
}