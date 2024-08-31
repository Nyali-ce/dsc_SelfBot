import Permission from "../../enums/Permission.js";
import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";

const run = async (client: Client, message: Message, args: string[]) => eval(args.join(' '));


export default {
    name: 'code',
    description: 'Code command',
    permission: Permission.OWNER,
    run
}
