import { clientUser } from "./database.js";

export default (USER_ID: string) => {
    const users = clientUser(null);

    if (users.filter((user: any) => user.id === USER_ID).length === 0) {
        const user = {
            id: USER_ID,
            permissions: []
        }

        users.push(user);

        clientUser(users);

        return user;
    }

    return users.filter((user: any) => user.id === USER_ID)[0];
}