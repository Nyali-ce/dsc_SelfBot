import { clientAdmin } from '../../functions/utils/database.js';

export default {
    name: 'MESSAGE_CREATE',
    run: async (client: any, message: any) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        let isPrivateCommand = false;

        const command = client.commands[commandName] || client.privateCommands[commandName];

        if (client.privateCommands[commandName]) isPrivateCommand = true;

        if (!command) return;

        if (isPrivateCommand) if (message.author.id !== process.env.USER_ID?.toString()) return console.log('Private command');
        else if (!clientAdmin(null).includes(message.author.id)) return console.log('Public command');

        try {
            command(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }
}