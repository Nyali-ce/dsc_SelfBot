import 'dotenv/config'
import { WebSocket } from 'ws'

const { USER_TOKEN } = process.env

// ! remove before dist, only used for debugging
const OPC = require('../src/OPC.json')

const ws = new WebSocket("wss://gateway.discord.gg/")

let heartbeat_interval: NodeJS.Timeout;

ws.on('open', () => console.log('Connected to Discord Gateway'));
ws.on('close', () => {
    // Stop the heartbeat on close
    if (heartbeat_interval) clearInterval(heartbeat_interval);

    console.log('Disconnected from Discord Gateway')
});

ws.on('message', (data: Buffer) => {
    // data is a buffer, so we need to parse it to String and then to JSON
    const payload = JSON.parse(data.toString());
    if (!payload.op) return console.log(payload);

    // op code 10 means "Hello" so we respond with a op code 2 "Identify"
    if (payload.op === 10) {
        sendPayload(2, {
            token: USER_TOKEN,
            properties: {},

            // ? custom presence here ("presence": { "status": "online", "since": 0, "activities": [], "afk": false })
        })
    }

    // op code 11 means "Heartbeat ACK" so we stop the heartbeat interval
    if (payload.op === 11 && heartbeat_interval) clearInterval(heartbeat_interval);

    // websocket works using heartbeat, so we need to send a heartbeat every x seconds (discord sends the interval in the Hello payload)
    if (payload.d?.heartbeat_interval) {
        heartbeat_interval = setInterval(() => {
            sendPayload(1, payload.s)
        }, payload.d.heartbeat_interval)
    }

    // ! remove before dist, only used for debugging
    payload.op = `${OPC[payload.op]} (${payload.op})`;
    console.log(payload);
})

const sendPayload = (op: number, d: any) => {
    ws.send(JSON.stringify({
        op,
        d
    }))
}