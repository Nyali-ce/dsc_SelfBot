import fs from 'fs';

const request = (path: string, dataType: any, data: any) => {
    if (!data) {
        if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify(dataType));
        return JSON.parse(fs.readFileSync(path).toString());
    } else {
        fs.writeFileSync(path, JSON.stringify(data));
    }
}

export function clientUser(data: any) { return request(`src/data/client/user.json`, { admins: [] }, data) }