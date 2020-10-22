module.exports = {
    name: "volume",
    category: "music",
    aliases: ["v"],   
    run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`No music playing on this server`);
    if(!args[0]) return message.channel.send(`Please enter a number`);
    if(isNaN(args[0])) return message.channel.send(`Please enter a valid number`);
    client.player.setVolume(message.guild.id, parseInt(args.join(" ")));
    message.channel.send("**Volume set to** `" +  args.join(" ") + "`" + `** **`);
   }
};
