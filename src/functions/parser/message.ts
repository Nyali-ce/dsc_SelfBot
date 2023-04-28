import fetch from 'node-fetch';

const parser = (message: any) => {
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

    class Author {
        /*
        accentColor
        avatar
        banner
        bot
        client
        createdAt
        createdTimestamp
        defaultAvatarURL
        discriminator
        dmChannel
        flags
        hexAccentColor
        id
        partial
        system
        tag
        username

        avatarURL
        bannerURL
        createDM
        deleteDM
        displayAvatarURL
        equals
        fetch
        fetchFlags
        send
        toString
        */
        id: string;
        flags: number;
        discriminator: string;
        avatar: string;
        username: string;
        constructor(author: any) {
            this.id = author.id;
            this.flags = author.public_flags;
            this.discriminator = author.discriminator;
            this.avatar = author.avatar;
            this.username = author.username;
        }

        displayAvatarURL(size: number = 256) {
            return this.avatar ?
                `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png?size=${size}` :
                `https://discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png`;
        }
    }

    class Channel {
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

        constructor(channel_id: string) {
            this.id = channel_id;
        }

        async send(content: string) {
            return fetch(`https://discord.com/api.v9/channels/${this.id}/messages`, {
                method: 'POST',
                headers: {
                    // @ts-expect-error
                    'authorization': process.env.USER_TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    content: content,
                    tts: false,
                }),
            })
                .catch((err: any) => console.log(err))
                .then((res: any) => res.json()).then((json: any) => { return json })
        }
    }

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
        author: Author;
        channel: Channel;
        channelId: string;
        id: string;
        tts: boolean;
        constructor(message: any) {
            this.author = new Author(message.author);
            this.channel = new Channel(message.channel_id);
            this.channelId = message.channel_id;
            this.id = message.id;
            this.tts = message.tts;
        }

        edit(content: string) {
            // has permission?


            // edit message
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


}