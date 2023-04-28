import { clientUser, getUser, setUser, hasPermission } from "../../functions/utils/database.js";

export default {
    name: 'admin',
    description: 'Add or remove admins.',
    permission: 'OWNER',
    run: async (client: any, message: any, args: any) => {
        if (message.mentions[0]) args[1] = message.mentions[0].id;
        switch (args[0]) {
            case 'add':
                if (args[1]) {
                    const user = getUser(args[1]);

                    if (!hasPermission(client, user.id, 'ADMINISTRATOR')) user.permissions.push('ADMINISTRATOR');

                    setUser(user);

                    message.channel.send(`Added ${args[1]} to the admin list.`);
                }
                break;
            case 'remove':
                if (args[1]) {
                    const user = getUser(args[1]);

                    if (hasPermission(client, user.id, 'ADMINISTRATOR')) user.permissions.splice(user.permissions.indexOf('ADMINISTRATOR'), 1);

                    setUser(user);

                    message.channel.send(`Removed ${args[1]} from the admin list.`);
                }
                break;
            case 'list':
                const users = clientUser(null);

                const admins = users.filter((user: any) => hasPermission(client, user.id, 'ADMINISTRATOR'));

                message.channel.send(`Admins: ${admins.map((user: any) => user.id).join(', ')}`);
                break;
            default:
                break;
        }
    }
}
