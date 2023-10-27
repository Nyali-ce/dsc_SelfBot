import { hasPermission } from "../../functions/utils/database.js";
import Message from "../../functions/api/message.js";

export default {
    name: 'MESSAGE_CREATE',
    run: async (client: any, rawMessage: any) => {
        const message = new Message(rawMessage);

        if (message.author!.bot) return;
        if (!message.content!.startsWith(client.prefix)) return;

        const args = message.content!.slice(client.prefix.length).trim().split(/ +/g);
        const commandName = args.shift()!.toLowerCase();

        console.log(client.commands)
        const command = client.commands[commandName]

        console.log(command)
        if (!command) return;

        if (!hasPermission(client, message.author!.id!, command.permission)) return

        console.log(message)

        try {
            command.run(client, message, args);

            // ! remove before dist, only for testing
            console.log(`Executed command ${commandName}`);
        } catch (error) {
            console.error(error);
        }
    }
}
