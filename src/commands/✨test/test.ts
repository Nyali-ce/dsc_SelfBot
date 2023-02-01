export default {
    name: 'test',
    description: 'Test command',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => console.log(message),
}
