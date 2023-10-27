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

class User {
    id: string;
    flags: number;
    discriminator: string;
    avatar: string;
    username: string;
    bot: boolean;
    constructor(author: User) {
        this.id = author.id;
        this.flags = author.flags;
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

    block() {
        const headers = new Headers();
        headers.set('authorization', process.env.USER_TOKEN || '');
        headers.set('content-type', 'application/json');

        const body = JSON.stringify({
            type: 2,
        });

        return fetch(`https://discord.com/api/v9/users/@me/relationships/${this.id}`, {
            method: 'PUT',
            headers,
            body,
        });
    }

    unblock() {
        const headers = new Headers();
        headers.set('authorization', process.env.USER_TOKEN || '');
        headers.set('content-type', 'application/json');

        return fetch(`https://discord.com/api/v9/users/@me/relationships/${this.id}`, {
            method: 'DELETE',
            headers,
        });
    }
}

export default User;