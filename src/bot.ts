process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

import 'dotenv/config';
import importHandlers from './functions/utils/importHandlers.js';
import connect from './functions/gateway/connect.js';

const { USER_TOKEN, CLIENT_PREFIX } = process.env;

const client = {
    prefix: CLIENT_PREFIX,
    ws: null,
    commands: {},
    privateCommands: {},
    events: {}
};

importHandlers(client);

// @ts-expect-error
connect(client, USER_TOKEN);