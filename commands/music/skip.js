const Discord = require("discord.js");

module.exports = {
    name: "skip",
    category: "music",
    aliases: ["sk"],
   run: async (client, message) => {
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`No music playing on this server`);
    const song = await client.player.skip(message.guild.id);
   const Embed = new Discord.MessageEmbed()
   .addField(`skipped:`, `${song.name}`)
   .addField(`Duration:`, `${song.duration}`)
   .setThumbnail(`${song.thumbnail}`)

   message.channel.send(Embed);
    
  }
}
