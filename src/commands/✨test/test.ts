import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";

export default {
    name: 'test',
    description: 'Test command',
    permission: 'ADMINISTRATOR',
    run: async (client: Client, message: Message, args: string[]) => {
        console.log(message)
    },
}
