import fetch from 'node-fetch';

export default async (channel_id: string, message_id: string, message: string) => {
    return fetch(`https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}`, {
        method: 'PATCH',
        headers: {
            // @ts-expect-error
            'authorization': process.env.USER_TOKEN,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
        }),
    })
        .catch((err: any) => console.log(err))
        .then((res: any) => res.json()).then((json: any) => { return json })
}