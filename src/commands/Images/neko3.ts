import Client from "../../functions/api/client.js";
import Message from "../../functions/api/message.js";
import fetch from "node-fetch";
import Permission from "../../enums/Permission.js";

const ratings: string[] = ['safe', 'suggestive', 'borderline', 'explicit']

const run = async (client: Client, message: Message, args: string[]) => {
    if(args[0] == '4' && message.channel.id == '1092970754657763410') return message.channel.send('This command with rating 4 is disabled in channels of this type.');
    let rating: string = 'safe';

    if (args[0] && parseInt(args[0]) > 0 && parseInt(args[0]) <= ratings.length ) {
        rating = ratings[parseInt(args[0]) - 1];
    }

    const res: any = await fetch(`https://api.nekosapi.com/v3/images/random?limit=1&rating=${rating}`)

    const img: any = (await res.json()).items[0].image_url;

    console.log(img)

    message.channel.send(img)
}

export default {
    name: 'neko3',
    description: 'Get a random neko image.',
    permission: Permission.ADMINISTRATOR,
    run
}
