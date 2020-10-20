const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    aliases: ["insta"],
    category: "fun",
    description: "Find out some nice instagram statistics",
    usage: "<name>",
    run: async (client, message, args) => {
        const name = args.join(" ");
        if (!name) return message.reply("Maybe it's useful to actually search for someone...!")   
        let res; 
        try {
            res = await fetch(`https://instagram.com/${name}/?__a=1`).then(url => url.json());

            const account = res.graphql.user;

            const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`**- Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`);

            message.channel.send(embed);
        } catch (e) {  
            message.reply("I couldn't Connect to the instgram api");
        }
    }
}