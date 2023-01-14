import fs from 'fs';

export default (client: any) => {
    fs.readdirSync('dist/functions/handlers').filter(file => file.endsWith('.js')).forEach(handler => {
        const { default: handlerFunction } = require(`../../functions/handlers/${handler}`);
        console.log(`Loaded handler ${handler}`);
        handlerFunction(client);
    });
};