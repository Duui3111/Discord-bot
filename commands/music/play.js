const Discord = require("discord.js");

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "music",
run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);
    if (!args[0]) return message.channel.send(`Please enter a music or playlist`); 
    const aSongIsAlreadyPlaying = client.player.isPlaying(message.guild.id);
    if(aSongIsAlreadyPlaying){
        const song = await client.player.addToQueue(message.guild.id, args.join(" "));
       const Embedq = new Discord.MessageEmbed()
       .addField(`added to queue:`, `${song.name}`)
       .addField(`Duration:`, `${song.duration}`)
       .setThumbnail(`${song.thumbnail}`)
   
       message.channel.send(Embedq);
    } else {
        const song = await client.player.play(message.member.voice.channel, args.join(" "));
        const Embed = new Discord.MessageEmbed()
        .addField(`Now playing:`, `${song.name}`)
        .addField(`Duration:`, `${song.duration}`)
        .setThumbnail(`${song.thumbnail}`)
    
        message.channel.send(Embed);
    }
  }
} 
