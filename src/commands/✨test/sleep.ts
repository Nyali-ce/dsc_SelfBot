import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import { exec } from "child_process"

export default {
    name: 'sleep',
    description: 'Puts my computer to sleep',
    permission: 'OWNER',
    run: async (client: Client, message: Message, args: string[]) => exec('rundll32.exe powrprof.dll,SetSuspendState 0,1,0')
    ,
}
