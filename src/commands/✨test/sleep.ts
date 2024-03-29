import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import { exec } from "child_process"
import Permission from "../../enums/Permission.js";

const run = async (client: Client, message: Message, args: string[]) => exec('rundll32.exe powrprof.dll,SetSuspendState 0,1,0')

export default {
    name: 'sleep',
    description: 'Puts my computer to sleep',
    permission: Permission.OWNER,
    run,
}
