const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leaderboard",
    aliases: ["leaderboard"],
    description:"rank leaderboard",
    usage: "leaderboard",
    category: "level stuff",
    run: async (client, message, args) => {
        let data = client.db.all().filter(i => i.ID.startsWith(`xp_`) && i.ID.endsWith(`${message.guild.id}`)).sort((a, b) => b.data - a.data);
        if (data.length < 1) return message.channel.send("No leaderboard");
        let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}_${message.guild.id}`) + 1 || "N/A";
        data.length = 10;
        let lb = [];
        for (let i in data)  {
            let id = data[i].ID.split("_")[1];
            let user = await message.guild.members.fetch(id).catch(() => null);
            let member = null;
            if(message.guild) member = await message.guild.members.fetch(user).catch(() => null);
            if(!member.user) continue;
            user = member.user ? member.user.tag : "Unknown User#0000";
            let rank = data.indexOf(data[i]) + 1;
            let level = client.db.get(`level_${id}_${message.guild.id}`);
            let xp = data[i].data;
            let xpreq = Math.floor(Math.pow(level / 0.1, 2));
            lb.push({ user: { id, tag: user }, rank, level, xp, xpreq });
        };

        const embed = new MessageEmbed()
        .setTitle("Leaderboard")
        .setColor("RANDOM")
        lb.forEach(d => { 
            embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`); 
        });
        embed.setFooter(`Your Position: ${myrank}`);
        return message.channel.send(embed);
    } 
}