const Discord = require("discord.js");

module.exports = {
    name: "roleinfo",
    aliases: ["roleinfo"],
    description:"Get roleinfo",
    category: "info",
    usage: "roleinfo | roleinfo <role>",
    run: async (client, message, args) => {
        if(!args[0]) return message.reply("Specify a role!");
        let gRole = message.guild.roles.cache.find(r => r.name === args.join(" ")) ||  message.guild.roles.cache.get(args[0]) ||  message.mentions.roles.first()
        if(!gRole) return message.reply("Couldn't find that role.");

        const bool = { false: "No", true: "Yes" }

        let roleemebed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .addField("ID", gRole.id, true )
        .addField("Name", gRole.name, true)
        .addField("Mention", `\`<@${gRole.id}>\``, true)
        .addField("Hex", gRole.hexColor, true)
        .addField("Members", gRole.members.size, true)
        .addField("Position", gRole.position, true)
        .addField("Hoisted", bool[gRole.hoist], true)
        .addField("Mentionable", bool[gRole.mentionable], true)
        .addField("Managed", bool[gRole.managed], true)
        
        message.channel.send(roleemebed);

    }
}