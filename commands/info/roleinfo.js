const Discord = require("discord.js");

module.exports = {
    name: "roleinfo",
    aliases: ["roleinfo"],
    description:"Get roleinfo",
    category: "info",
    usage: "roleinfo | roleinfo <role>",
    run: async (client, message, args) => {
        let role = args.join(` `)
        if(!role) return message.reply("Specify a role!");
        let gRole = message.guild.roles.cache.find(r => r.name === args.join(" "));
        console.log(gRole)
        if(!gRole) return message.reply("Couldn't find that role.");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleemebed = new Discord.RichEmbed()
        .setColor("#00ff00")
        .addField("ID", gRole.id, true )
        .addField("Name", gRole.name, true)
        .addField("Mention", `\`<@${gRole.id}>\``, true)
        .addField("Hex", gRole.hexColor, true)
        .addField("Members", gRole.members.size, true)
        .addField("Position", gRole.position, true)
        .addField("Hoisted", status[gRole.hoist], true)
        .addField("Mentionable", status[gRole.mentionable], true)
        .addField("Managed", status[gRole.managed], true)
        
        message.channel.send(roleemebed);

    }
}