export default {
    name: 'test',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => console.log(message),
}
