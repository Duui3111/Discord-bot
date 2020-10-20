const {MessageEmbed} = require("discord.js")

module.exports = {
  name: "channelinfo", 
  description: "Shows channel info.", 
  aliases: ["cinfo"],
  category: "info", 
  run: async (client, message, args) => {

        let channel = message.guild.channels.cache.find(c => c.name.includes(args.join(' '))) ||  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    
        let ismentions;
        if(!args.join(" ")) ismentions = message.channel.id;
        else if(args.join(" ")) ismentions = channel.id;

        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Channels | ${channel.name}`, message.guild.iconURL({ dynamic: true }), null)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField('Channel Name', `<#${ismentions}>`, true)
        .addField('Channel ID', `${channel.id}`, true)
        .addField('Channel Catagory', `${message.channel.parent.name}`)
        .addField('Channel Created At', `${new Date(channel.createdAt).toLocaleString('en-us', { dateStyle: 'full'})}`)
        .setTimestamp()

        message.channel.send(embed);
    }
}