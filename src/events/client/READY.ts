export default {
    name: 'READY',
    run: async (client: any, message: any) => {
        client.USER_ID = message.user.id
        console.log(`Logged in as ${message.user.username}#${message.user.discriminator} (${message.user.id})`)
    }
}
