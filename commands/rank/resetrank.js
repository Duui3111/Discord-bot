const { MessageEmbed } = require("discord.js");

  module.exports = {
    name: "resetrank",
    aliases: ["resetrank"],
    description:"reset rank the ppl",
    usage: "resetrank <player>",
    category: "level stuff",
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    if (!message.member.permissions.has("ADMINISTRATOR") || message.author.id !== "480423869040295959")  return message.channel.send(new MessageEmbed()
    .setTitle(":x: ERROR")
    .setDescription(`you dont have enaf permission to use that command`)
    .setColor(0xFF0000)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp());
    
    if (!user) return message.channel.send(new MessageEmbed()
        .setTitle(":x: ERROR")
        .setDescription(`there was no Member mentions to\n reset the level to`)
        .setColor(0xFF0000)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp());

    let oldlvl = client.db.get(`level_${user.id}_${message.guild.id}`)
    client.db.set(`level_${user.id}_${message.guild.id}`, 1)
    let newlvl = client.db.get(`level_${user.id}_${message.guild.id}`)
    const embed = new MessageEmbed()
        .setTitle(user.tag)
        .addField("old Level", oldlvl, true)
        .addField("new Level", newlvl, true)
        .setColor(0x00FF00)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp();
    return message.channel.send({ embed });
  }
} 