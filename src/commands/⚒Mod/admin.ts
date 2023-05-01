import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import { clientUser, getUser, setUser, hasPermission } from "../../functions/utils/database.js";

const addUser = (client: Client, message: Message, id: string) => {
    if (!id) return;

    const user = getUser(id);

    if (hasPermission(client, user.id, 'ADMINISTRATOR')) return message.channel.send('User is already an admin.');

    user.permissions.push('ADMINISTRATOR');

    setUser(user);

    message.channel.send(`Added ${id} to the admin list.`);
}

const removeUser = (client: Client, message: Message, id: string) => {
    if (!id) return;

    const user = getUser(id);

    if (!hasPermission(client, user.id, 'ADMINISTRATOR')) return message.channel.send('User is not an admin.');

    user.permissions.splice(user.permissions.indexOf('ADMINISTRATOR'), 1);

    setUser(user);

    message.channel.send(`Removed ${id} from the admin list.`);
}

const listUsers = (client: Client, message: Message) => {
    const users = clientUser(null);

    const admins = users.filter((user: any) => hasPermission(client, user.id, 'ADMINISTRATOR'));

    message.channel.send(`Admins: ${admins.map((user: any) => user.id).join(', ')}`);
}

const run = async (client: Client, message: Message, args: string[]) => {
    if (message.mentions[0]) args[1] = message.mentions[0].id;
    switch (args[0]) {
        case 'add':
            addUser(client, message, args[1]);
            break;
        case 'remove':
            removeUser(client, message, args[1]);
            break;
        case 'list':
            listUsers(client, message);
            break;
        default:
            break;
    }
}

export default {
    name: 'admin',
    description: 'Add or remove admins.',
    permission: 'OWNER',
    run
}
