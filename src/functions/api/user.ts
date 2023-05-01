class User {
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
    bot: boolean;
    constructor(author: any) {
        this.id = author.id;
        this.flags = author.public_flags;
        this.discriminator = author.discriminator;
        this.avatar = author.avatar;
        this.username = author.username;
        this.bot = author.bot;
    }

    displayAvatarURL(size: number = 256) {
        return this.avatar ?
            `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png?size=${size}` :
            `https://discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png`;
    }
}

export default User;