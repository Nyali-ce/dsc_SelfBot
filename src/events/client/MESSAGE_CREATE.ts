import hasPermission from "../../functions/utils/hasPermission.js";

export default {
    name: 'MESSAGE_CREATE',
    run: async (client: any, message: any) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix)) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const command = client.commands[commandName]

        if (!command) return;

        if (!hasPermission(message.author.id, command.permissions)) return

        try {
            command(client, message, args);

            // ! remove before dist, only for testing
            console.log(`Executed command ${commandName}`);
        } catch (error) {
            console.error(error);
        }
    }
}
