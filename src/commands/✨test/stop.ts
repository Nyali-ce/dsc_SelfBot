export default {
    name: 'stop',
    description: 'Stops the bot',
    permissions: ['OWNER'],
    run: async (client: any, message: any, args: any) => {
        await message.channel.send(`Stopping \`pid${process.pid}\` on \`${process.env.OS}\``);

        client.ws.close();
        process.exit();
    }
}