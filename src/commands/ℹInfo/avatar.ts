import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import User from "../../functions/api/user.js";

const run = async (client: Client, message: Message, args: string[]) => {
    const user: User = message.mentions[0] || message.author

    const avatar: string = user.displayAvatarURL(1024)

    message.channel.send('', [{ image: { avatar } }]);
}

export default {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
    permission: 'ADMINISTRATOR',
    run
}