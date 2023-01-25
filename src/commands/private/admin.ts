import { clientUser } from "../../functions/utils/database.js";
import sendMessage from "../../functions/utils/sendMessage.js";

export default {
    name: 'admin',
    permissions: ['OWNER'],
    run: async (client: any, message: any, args: any) => {
        const users = clientUser(null);

        if (!users.admins) users.admins = [];

        switch (args[0]) {
            case 'add':
                if (args[1]) {
                    if (!users.admins.filter((user: any) => user === args[1]).includes(args[1])) users.admins.push(args[1]);

                    clientUser(users);

                    sendMessage(message.channel_id, `Added ${args[1]} to the admin list.`);
                }
                break;
            case 'remove':
                if (args[1]) {
                    if (users.admins.filter((user: any) => user === args[1]).includes(args[1])) users.admins.splice(users.admins.indexOf(args[1]), 1);

                    clientUser(users);

                    sendMessage(message.channel_id, `Removed ${args[1]} from the admin list.`);
                }
                break;
            case 'list':
                sendMessage(message.channel_id, `Admins: ${users.admins.join(', ')}`);
                break;
            default:
                break;
        }
    }
}
