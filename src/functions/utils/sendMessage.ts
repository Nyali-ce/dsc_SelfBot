import fetch from 'node-fetch';

export default (channel: string, message: string) => {
    fetch(`https://discord.com/api/v9/channels/${channel}/messages`, {
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
}