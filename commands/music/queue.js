module.exports = {
    name: "queue",
    category: "music",
    run: async (client, message) => {

    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel`);
    const queue = client.player.getQueue(message.guild.id);
    if(!queue) return message.channel.send(`No songs currently playing`);
    message.channel.send(`Server queue \n`+(queue.songs.map((song, i) => {
        return `${i === 0 ? 'Current' : `#${i+1}`} - ${song.name} | ${song.author}`
    }).join('\n')));
   }
}
