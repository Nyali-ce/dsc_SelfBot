process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

import 'dotenv/config';
import importHandlers from './functions/utils/importHandlers.js';
import connect from './functions/gateway/connect.js';

const client = {
    ws: null,
    commands: {},
    events: {}
};

const { USER_TOKEN } = process.env;

importHandlers(client);

// @ts-expect-error
connect(client, USER_TOKEN);