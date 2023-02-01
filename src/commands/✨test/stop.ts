import sendMessage from "../../functions/api/sendMessage.js";

export default {
    name: 'stop',
    description: 'Stops the bot',
    permissions: ['OWNER'],
    run: async (client: any, message: any, args: any) => {
        await sendMessage(message.channel_id, `Stopping \`pid${process.pid}\` on \`${process.env.OS}\``);

        client.ws.close();
        process.exit();
    }
}