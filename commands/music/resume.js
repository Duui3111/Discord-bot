const Discord = require("discord.js");

module.exports ={
    name: "resume",
    category: "music",
    run: async (client, message) => {
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);
    const song = await client.player.resume(message.guild.id);
    if(!song) return message.channel.send(`No songs currently playing`);
    const Embed = new Discord.MessageEmbed()
    .addField(`resumed:`, `${song.name}`)
    .addField(`Duration:`, `${song.duration}`)
    .setThumbnail(`${song.thumbnail}`)

    message.channel.send(Embed);
   }
}