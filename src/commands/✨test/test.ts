export default {
    name: 'test',
    description: 'Test command',
    permission: 'ADMINISTRATOR',
    run: async (client: any, message: any, args: any) => {
        console.log(message)
    },
}
