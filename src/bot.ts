process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

import 'dotenv/config';
import Client from './functions/api/client.js';

const { USER_TOKEN, CLIENT_PREFIX } = process.env;

if (!USER_TOKEN) throw new Error('USER_TOKEN is not defined');
if (!CLIENT_PREFIX) throw new Error('CLIENT_PREFIX is not defined');

const client = new Client(CLIENT_PREFIX, USER_TOKEN);

client.login();