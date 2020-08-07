const emotes = require ("../../emojis.json");

module.exports = {
    name: "stop",
    category: "music",
    aliases: ["s"],
    run: async (client, message) => {
    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`);
    client.player.stop(message.guild.id);
    message.channel.send(`**Music stopped ${emotes.success}**`);
  }
}
