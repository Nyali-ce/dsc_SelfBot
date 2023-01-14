export default {
    name: 'MESSAGE_CREATE',
    run: async (client: any, message: any) => {
        if (message.author.username == 'Nyali.ce') console.log(message);
    }
}