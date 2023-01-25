import { clientUser } from "./database.js"

export default (USER_DATA: any) => {
    const users = clientUser(null);

    let user = users.filter((user: any) => user.id === USER_DATA.id)[0];

    if (!user) {
        users.push(USER_DATA);

        clientUser(users);

        return USER_DATA;
    } else {
        user = USER_DATA;

        clientUser(users);
    }
}