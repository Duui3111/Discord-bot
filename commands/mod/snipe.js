const { MessageEmbed } = require("discord.js");

module.exports ={
    name: "snipe",
    category: "moderation",
    aliases: ["snipe"],
    description: "Shows the most recent deleted message.",
    usage: "snipe",
    run: async(client, message, args) => {
        const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.channel.send("There are no deleted messages in this channel!")
        const embed = new MessageEmbed()
        .setAuthor(msg.author)
        .setDescription(msg.content)
        if(msg.image)embed.setImage(msg.image)
        
        message.channel.send(embed)
    }
} 