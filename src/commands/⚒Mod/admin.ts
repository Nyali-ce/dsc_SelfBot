import { clientUser, getUser, setUser, hasPermission } from "../../functions/utils/database.js";
import sendMessage from "../../functions/api/sendMessage.js";

export default {
    name: 'admin',
    permissions: ['OWNER'],
    run: async (client: any, message: any, args: any) => {
        switch (args[0]) {
            case 'add':
                if (args[1]) {
                    const user = getUser(args[1]);

                    if (!hasPermission(user.id, 'ADMINISTRATOR')) user.permissions.push('ADMINISTRATOR');

                    setUser(user);

                    sendMessage(message.channel_id, `Added ${args[1]} to the admin list.`);
                }
                break;
            case 'remove':
                if (args[1]) {
                    const user = getUser(args[1]);

                    if (hasPermission(user.id, 'ADMINISTRATOR')) user.permissions.splice(user.permissions.indexOf('ADMINISTRATOR'), 1);

                    setUser(user);

                    sendMessage(message.channel_id, `Removed ${args[1]} from the admin list.`);
                }
                break;
            case 'list':
                const users = clientUser(null);

                const admins = users.filter((user: any) => hasPermission(user.id, 'ADMINISTRATOR'));

                sendMessage(message.channel_id, `Admins: ${admins.map((user: any) => user.id).join(', ')}`);
                break;
            default:
                break;
        }
    }
}
