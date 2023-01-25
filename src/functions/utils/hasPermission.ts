import { clientUser } from "./database.js"

export default (USER_ID: string, permission: string) => {
    if (USER_ID === process.env.USER_ID) return true;

    const users = clientUser(null);

    if (!users?.includes(USER_ID)) {
        users.push({
            id: USER_ID,
            permissions: []
        })

        clientUser(users);

        return false;
    }

    return users[USER_ID].permissions.includes(permission);
}