process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

import 'dotenv/config';
import handlers from './functions/utils/handlers.js';
import connect from './functions/api/connect.js';

const { USER_TOKEN, CLIENT_PREFIX } = process.env;

const client = {
    prefix: CLIENT_PREFIX,
    ws: null,
    commands: {},
    events: {}
};

handlers(client);

// @ts-expect-error
connect(client, USER_TOKEN);
