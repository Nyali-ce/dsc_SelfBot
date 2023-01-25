import { clientUser } from '../../functions/utils/database.js';

export default {
    name: 'MESSAGE_CREATE',
    run: async (client: any, message: any) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const command = client.commands[commandName]

        if (!command) return;

        const users = clientUser(null);

        if (command.permissions !== 'OWNER') {
            switch (command.permissions) {
                case 'ADMINISTRATOR':
                    if (!users.admins.includes(message.author.id)) return;
                    break;
                default:
                    break;
            }
        }

        try {
            command(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }
}
