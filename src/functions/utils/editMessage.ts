import fetch from 'node-fetch';

export default (channel_id: string, message_id: string, message: string) => {
    fetch(`https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}`, {
        method: 'PATCH',
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
        .then((res: any) => { return res.json() });
}