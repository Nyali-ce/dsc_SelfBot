import fs from 'fs';

export default (client: any) => {
    const eventFolders = fs.readdirSync('dist/events');
    eventFolders.forEach(folder => {
        const eventFiles = fs.readdirSync(`dist/events/${folder}`).filter(file => file.endsWith('.js'));
        switch (folder) {
            case 'client':
                eventFiles.forEach(async file => {
                    const { default: event } = await import(`dist/events/${folder}/${file}`);
                    if (!event || !event.name || !event.run) return;
                    if (event.once) client.once(event.name, (...args: any) => event.run(client, ...args));
                    else client.on(event.name, (...args: any) => event.run(...args, client));
                });
                break;
            default:
                break;
        }
    })
}