import { clientUser } from "./database.js"

export default (USER_ID: string, permission: string) => {
    if (USER_ID === process.env.USER_ID) return true;

    const users = clientUser(null);

    const user = users.filter((user: any) => user.id === USER_ID)[0];

    if (!user) {
        const user = {
            id: USER_ID,
            permissions: []
        }

        users.push(user);

        clientUser(users);

        return false;
    } else {
        return user.permissions.includes(permission);
    }
}