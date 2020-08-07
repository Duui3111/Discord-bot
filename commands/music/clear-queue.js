const emotes = require ("../../emojis.json");

module.exports = {
    name: "clear-queue",
    category: "music",
   run: async (client, message) => {
    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`);
    client.player.clearQueue(message.guild.id);
    message.channel.send(`**Queue cleared ${emotes.success}**`);
  }
}
