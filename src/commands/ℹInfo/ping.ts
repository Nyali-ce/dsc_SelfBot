import Message from "../../functions/api/message.js"

export default {
    name: 'ping',
    description: 'Get the bot\'s ping.',
    permission: 'ADMINISTRATOR',
    run: async (client: any, message: any, args: any) => {
        const startTime = Date.now()

        const res = new Message(await message.channel.send('Pinging...'))

        const endTime = Date.now()

        await res.edit(`Pong! \`${endTime - startTime}ms\``)
    },
}
