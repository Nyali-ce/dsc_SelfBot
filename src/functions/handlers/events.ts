import fs from 'fs';

export default (client: any) => {
    fs.readdirSync('dist/events').forEach(folder => {
        const eventFiles = fs.readdirSync(`dist/events/${folder}`).filter(file => file.endsWith('.js'));

        switch (folder) {
            case 'client':
                eventFiles.forEach(async file => {
                    const { default: event } = await import(`../../events/${folder}/${file}`);

                    if (!event || !event.name || !event.run) return;

                    const { events } = client;
                    events[event.name] = event.run;

                    console.log(`Loaded event ${event.name}`);
                });
                break;
            default:
                break;
        }
    })
}
