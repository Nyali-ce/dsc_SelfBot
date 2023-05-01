import Message from "./message";
import fetch from "node-fetch";

class TextChannel {
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
    id: string;

    constructor(channel: any) {
        this.id = channel.channel_id;
    }

    async send(content: string, embeds: any[] = []) {
        return fetch(`https://discord.com/api/v9/channels/${this.id}/messages`, {
            method: 'POST',
            headers: {
                // @ts-expect-error
                'authorization': process.env.USER_TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                embeds: embeds,
                tts: false,
            }),
        })
            .catch((err: any) => console.log(err))
            .then((res: any) => res.json()).then((json: any) => { return new Message(json) })
    }
}

export default TextChannel;