import fs from 'fs';

const request = (path: string, dataType: any, data: any) => {
    if (!data) {
        if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify(dataType));
        return JSON.parse(fs.readFileSync(path).toString());
    } else {
        fs.writeFileSync(path, JSON.stringify(data));
    }
}

const clientUser = (data: any) => request(`src/data/client/user.json`, [], data);

const getUser = (USER_ID: string) => {
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

const setUser = (USER_DATA: any) => {
    const users = clientUser(null);

    let user = users.filter((user: any) => user.id === USER_DATA.id)[0];

    if (!user) {
        users.push(USER_DATA);

        clientUser(users);

        return USER_DATA;
    } else {
        users.splice(users.indexOf(user), 1, USER_DATA);

        clientUser(users);
    }
}

const hasPermission = (USER_ID: string, permission: string) => {
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

export { clientUser, getUser, setUser, hasPermission };