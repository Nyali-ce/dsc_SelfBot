import fetch from 'node-fetch';

import TextChannel from './textChannel.js';
import User from './user.js';

// parse the message from a discord message (user account) to a discord message (bot account)

// data in the message object (user account)
/*{
  type: 0,
  tts: false,
  timestamp: '2023-04-28T13:23:49.900000+00:00',
  referenced_message: null,
  pinned: false,
  nonce: '1101499013984681984',
  mentions: [],
  mention_roles: [],
  mention_everyone: false,
  id: '1101499014421160047',
  flags: 0,
  embeds: [],
  edited_timestamp: null,
  content: '!!test',
  components: [],
  channel_id: '736846958156578816',     
  author: {
    username: 'Nyali.ce',
    public_flags: 4194432,
    id: '487019080545468421',
    global_name: null,
    display_name: null,
    discriminator: '6969',
    avatar_decoration: 'v2_a_37dc2b53b273a457ff19ac2e3fda7e4c',
    avatar: '74ce9a71d89a4252ec8705871b9831b4'
  },
  attachments: []
} */

class Message {
    /*
    activity
    applicationId
    attachments
    author
    bulkDeletable
    channel
    channelId
    cleanContent
    client
    components
    content
    createdAt
    createdTimestamp
    crosspostable
    deletable
    editable
    editedAt
    editedTimestamp
    embeds
    flags
    groupActivityApplication
    guild
    guildId
    hasThread
    id
    interaction
    member
    mentions
    nonce
    partial
    pinnable
    pinned
    position
    reactions
    reference
    roleSubscriptionData
    stickers
    system
    thread
    tts
    type
    url
    webhookId

    awaitMessageComponent
    awaitReactions
    createMessageComponentCollector
    createReactionCollector
    crosspost
    delete
    edit
    equals
    fetch
    fetchReference
    fetchWebhook
    inGuild
    pin
    react
    removeAttachments
    reply
    resolveComponent
    startThread
    suppressEmbeds
    toString
    unpin
        */
    author: User;
    channel: TextChannel;
    channelId: string;
    content: string;
    createdAt: Date;
    createdTimestamp: number;
    id: string;
    tts: boolean;
    mentions: any;
    pinned: boolean;
    constructor(message: any) {
        this.author = new User(message.author);
        this.channel = new TextChannel({ channel_id: message.channel_id });
        this.channelId = message.channel_id;
        this.content = message.content;
        this.createdAt = new Date(message.timestamp);
        this.createdTimestamp = this.createdAt.getTime();
        this.id = message.id;
        this.tts = message.tts;
        this.mentions = message.mentions.map((mention: any) => new User(mention));
        this.pinned = message.pinned;
    }

    edit(content: string) {
        return fetch(`https://discord.com/api/v9/channels/${this.channelId}/messages/${this.id}`, {
            method: 'PATCH',
            headers: {
                // @ts-expect-error
                'authorization': process.env.USER_TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
            }),
        })
            .catch((err: any) => console.log(err))
            .then((res: any) => res.json()).then((json: any) => { return json })
    }
}

export default Message;
