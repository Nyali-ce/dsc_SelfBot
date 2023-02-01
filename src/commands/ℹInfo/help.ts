import fs from 'fs';
import sendMessage from "../../functions/api/sendMessage.js"

export default {
    name: 'help',
    description: 'Get a list of commands.',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        const commands: string[] = [];

        await new Promise((resolve) => {
            const commandFolder = fs.readdirSync('./dist/commands');

            commandFolder.forEach((dir: any) => {
                const categoryFolder = fs.readdirSync(`./dist/commands/${dir}`);

                categoryFolder.forEach((file: any) => {
                    if (file.endsWith('.js')) commands.push(`${dir}/${file.slice(0, -3)}`);

                    if (categoryFolder[categoryFolder.length - 1] === file && commandFolder[commandFolder.length - 1] === dir) resolve('Done');
                });
            });
        })

        if (!args[0]) {
            const categories: any = {}

            commands.forEach((command: any) => {
                const category = command.split('/')[0];
                const commandName = command.split('/')[1];

                if (!categories[category]) categories[category] = [];

                categories[category].push(commandName);
            });

            let text = '**__Commands:__**';

            for (const category in categories) {
                text += `\n**${category}:**`;

                categories[category].forEach((command: any) => {
                    text += ` \`${command}\``;
                });
            }

            text += '\nUse `help <command>` to get more info about a command';

            sendMessage(message.channel_id, text);
        } else {
            const command = commands.find((command: any) => command.split('/')[1] === args[0]);

            if (!command) return sendMessage(message.channel_id, 'Invalid command');

            const { default: commandInfo } = await import(`../../commands/${command}.js`);

            sendMessage(message.channel_id, `**Command:** ${commandInfo.name}\n**Description:** ${commandInfo.description}\n**Permissions:** ${commandInfo.permissions?.join(', ')}`);
        }
    }
}