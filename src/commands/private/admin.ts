import { clientAdmin } from "../../functions/utils/database.js";
import sendMessage from "../../functions/utils/sendMessage.js";

export default {
    name: 'admin',
    run: async (client: any, message: any, args: any) => {
        const admins = clientAdmin(null);

        switch (args[0]) {
            case 'add':
                if (args[1]) {
                    if (clientAdmin(null).includes(args[1])) return

                    admins.push(args[1]);

                    clientAdmin(admins);

                    sendMessage(message.channel_id, `Added ${args[1]} to the admin list.`);
                }
                break;
            case 'remove':
                if (args[1]) {
                    if (!clientAdmin(null).includes(args[1])) return

                    admins.splice(admins.indexOf(args[1]), 1);

                    clientAdmin(admins);

                    sendMessage(message.channel_id, `Removed ${args[1]} from the admin list.`);
                }
                break;
            case 'list':
                sendMessage(message.channel_id, `Admins: ${admins.join(', ')}`);
                break;
            default:
                break;
        }
    }
}