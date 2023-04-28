export default {
    name: 'say',
    description: 'Make the bot say something.',
    permission: 'ADMINISTRATOR',
    run: async (client: any, message: any, args: any) => {
        const text = args.join(' ');

        message.channel.send(text);
    }
}
