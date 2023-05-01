import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fs from 'fs';

const commands: string[] = [];

const run = async (client: Client, message: Message, args: string[]) => {
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

        message.channel.send(text);
    } else {
        const command = commands.find((command: any) => command.split('/')[1] === args[0]);

        if (!command) return message.channel.send('Invalid command');

        const { default: commandInfo } = await import(`../../commands/${command}.js`);

        message.channel.send(`**Command:** ${commandInfo.name}\n**Description:** ${commandInfo.description}\n**Permissions:** ${commandInfo.permissions?.join(', ')}`);
    }
}

export default {
    name: 'help',
    description: 'Get a list of commands.',
    permission: 'ADMINISTRATOR',
    run
}