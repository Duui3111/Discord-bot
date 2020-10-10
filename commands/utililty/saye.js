const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sayembed",
     category: "utililty",
     aliases: ["sayembed"],
     description:"say embed",
     usage: "sayembed",  
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setDescription(args.join(" "))
        .setColor("RANDOM")
		return message.channel.send(embed);
     }
 } 
 