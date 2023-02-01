import fetch from 'node-fetch';

export default async (channel: string, message: string) => {
    return fetch(`https://discord.com/api/v9/channels/${channel}/messages`, {
        method: 'POST',
        headers: {
            // @ts-expect-error
            'authorization': process.env.USER_TOKEN,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
            tts: false,
        }),
    })
        .catch((err: any) => console.log(err))
        .then((res: any) => res.json()).then((json: any) => { return json })
}
