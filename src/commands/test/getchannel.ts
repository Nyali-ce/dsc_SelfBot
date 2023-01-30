import fetch from "node-fetch"

export default {
    name: 'getchannel',
    permissions: ['ADMINISTRATOR'],
    run: async (client: any, message: any, args: any) => {
        fetch(`https://discord.com/api/v9/channels/${message.channel_id}`, {
            method: 'GET',
            headers: {
                // @ts-expect-error
                'authorization': process.env.USER_TOKEN,
                'content-type': 'application/json',
            },
        }
        ).then(res => res.json()).then(json => console.log(json))
    }
}