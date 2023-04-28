import fetch from "node-fetch"

export default {
    name: 'getchannel',
    description: 'test command',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        fetch(`https://discord.com/api/v9/channels/${message.channelId}`, {
            method: 'GET',
            headers: {
                'authorization': client.USER_TOKEN,
                'content-type': 'application/json',
            },
        }
        ).then(res => res.json()).then(json => console.log(json))
    }
}