import fs from 'fs';

export default (client: any) => {
    const commandFolders = fs.readdirSync('dist/commands');
    commandFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(`dist/commands/${folder}`).filter(file => file.endsWith('.js'));
        commandFiles.forEach(async file => {
            const { default: command } = await import(`dist/commands/${folder}/${file}`);
            if (!command || !command.name || !command.run) return console.log(`${file} is not a valid command.`);
            const { commands } = client;
            commands.set(command.name, command);
        });
    });
}