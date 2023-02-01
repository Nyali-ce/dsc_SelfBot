export default {
    name: 'stop',
    description: 'Stops the bot',
    permissions: ['OWNER'],
    run: async (client: any, message: any, args: any) => {
        client.ws.close();
        process.exit();
    }
}