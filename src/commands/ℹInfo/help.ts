import fs from 'fs';
import sendMessage from "../../functions/utils/sendMessage.js"

export default {
    name: 'help',
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
            sendMessage(message.channel_id, `Commands: ${commands.join(', ')}`);
        } else {
            const command = commands.find((command: any) => command.split('/')[1] === args[0]);

            if (!command) return sendMessage(message.channel_id, 'Invalid command');

            const { default: commandInfo } = await import(`../../commands/${command}.js`);

            sendMessage(message.channel_id, `Name: ${commandInfo.name}\nDescription: ${commandInfo.description}\nPermissions: ${commandInfo.permissions?.join(', ')}`);
        }
    }
}