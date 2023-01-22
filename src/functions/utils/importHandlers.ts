import fs from 'fs';

export default (client: any) => {
    fs.readdirSync('dist/functions/handlers').filter(file => file.endsWith('.js')).forEach(handler => {
        import(`../../functions/handlers/${handler}`).then(handlerFunction => {
            console.log(`Loaded handler ${handler}`);
            handlerFunction.default(client);
        });
    })
};