export default {
    name: 'stop',
    description: 'Stops the bot',
    permission: 'OWNER',
    run: async (client: any, message: any, args: string[]) => {
        await message.channel.send(`Stopping \`pid${process.pid}\` on \`${process.env.OS}\``);

        client.ws.close();
        process.exit();
    }
}