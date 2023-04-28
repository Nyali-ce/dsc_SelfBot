import { WebSocket } from "ws";
import handlers from "../utils/handlers.js";

// ! remove before dist, only for testing
const OPC = [
    "Dispatch",
    "Heartbeat",
    "Identify",
    "PresenceUpdate",
    "VoiceStateUpdate",
    "Sus?",
    "Resume",
    "Reconnect",
    "RequestGuildMembers",
    "InvalidSession",
    "Hello",
    "HeartbeatAck"
]

let heartbeat_interval: NodeJS.Timeout, connect_interval: NodeJS.Timeout;

const sendPayload = (client: Client, op: number, d: any) => {
    client.ws.send(JSON.stringify({
        op,
        d
    }))
}

const onMessage = (client: Client, data: Buffer) => {
    {
        // data is a buffer, so we need to parse it to String and then to JSON
        const payload = JSON.parse(data.toString());
        if (payload.op == undefined) return console.log('Invalid payload');

        // op code 0 means "Dispatch" so we run the event
        payload.op === 0 && client.events[payload.t] ? client.events[payload.t](client, payload.d) : eval(`{}`);

        // op code 10 means "Hello" so we respond with a op code 2 "Identify"
        if (payload.op === 10) {
            sendPayload(client, 2, {
                token: client.USER_TOKEN,
                properties: {},

                // ? custom presence here ("presence": { "status": "online", "since": 0, "activities": [], "afk": false })
            });
        }

        // op code 11 means "Heartbeat ACK" so we stop the heartbeat interval
        if (payload.op === 11 && heartbeat_interval) clearInterval(heartbeat_interval);

        // websocket works using heartbeat, so we need to send a heartbeat every x seconds (discord sends the interval in the Hello payload)
        if (payload.d?.heartbeat_interval) {
            heartbeat_interval = setInterval(() => {
                sendPayload(client, 1, payload.s);
            }, payload.d.heartbeat_interval);
        }

        // ! remove before dist, only for testing
        payload.op = `${OPC[payload.op]} (${payload.op})`;
        console.log(payload.op, payload.t);
    }
}

class Client {
    prefix: string;
    events: any;
    commands: any;
    ws: any;
    USER_TOKEN: string;
    USER_ID: string | null;

    constructor(prefix: string, USER_TOKEN: string) {
        this.prefix = prefix;
        this.events = {};
        this.commands = {};
        this.ws = null;
        this.USER_TOKEN = USER_TOKEN;
        this.USER_ID = null;
        handlers(this);
    }

    login = () => {
        this.ws = new WebSocket("wss://gateway.discord.gg/");

        this.ws.on('open', () => {
            // Stop the reconnect interval on open
            if (connect_interval) clearInterval(connect_interval);

            console.log('Connected to Discord Gateway');
        });

        this.ws.on('close', () => {
            // Stop the heartbeat on close
            if (heartbeat_interval) clearInterval(heartbeat_interval);

            // Try to reconnect every 5 seconds
            connect_interval = setInterval(() => {
                this.login();
            }, 5000);

            console.log('Disconnected from Discord Gateway');
        });

        this.ws.on('message', (data: Buffer) => onMessage(this, data))

    }
}

export default Client;