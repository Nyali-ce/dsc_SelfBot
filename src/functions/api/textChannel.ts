import Message from "./message.js";
import fetch from "node-fetch";

/*
client
createdAt
createdTimestamp
defaultAutoArchiveDuration
deletable
flags
guild
guildId
id
lastMessage
lastMessageId
lastPinAt
lastPinTimestamp
manageable
members
messages
name
nsfw
parent
parentId
partial
permissionOverwrites
permissionsLocked
position
rateLimitPerUser
rawPosition
threads
topic
type
url
viewable

awaitMessageComponent
awaitMessages
bulkDelete
clone
createInvite
createMessageCollector
createMessageComponentCollector
createWebhook
delete
edit
equals
fetch
fetchInvites
fetchWebhooks
isDMBased
isTextBased
isThread
isVoiceBased
lockPermissions
permissionsFor
send
sendTyping
setDefaultAutoArchiveDuration
setName
setNSFW
setParent
setPosition
setRateLimitPerUser
setTopic
setType
toString
*/

class TextChannel {
    id: string;

    constructor(channel: any) {
        this.id = channel.channel_id;
    }

    async send(content: string) {
        const headers = new Headers();
        headers.set('authorization', process.env.USER_TOKEN || '');
        headers.set('content-type', 'application/json');

        const body = JSON.stringify({
            content: content,
            tts: false,
        })

        return fetch(`https://discord.com/api/v9/channels/${this.id}/messages`, {
            method: 'POST',
            headers,
            body: body,
        })
            .catch((err: any) => console.log(err))
            .then((res: any) => res.json()).then((json: any) => {
                if (json.code) console.log(json);
                return new Message(json)
            })
    }
}

export default TextChannel;