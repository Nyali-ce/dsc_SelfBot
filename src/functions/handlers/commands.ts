import fs from 'fs';

export default (client: any) => {
    fs.readdirSync('dist/commands').forEach(folder => {
        const commandFiles = fs.readdirSync(`dist/commands/${folder}`).filter(file => file.endsWith('.js'));

        commandFiles.forEach(async file => {
            const { default: command } = await import(`../../commands/${folder}/${file}`);

            if (!command || !command.name || !command.run) return console.log(`${file} is not a valid command.`);

            const { commands, privateCommands } = client;

            (folder === 'private' ? privateCommands : commands)[command.name] = command.run;

            console.log(`Loaded command ${command.name}`);
        });
    });
}