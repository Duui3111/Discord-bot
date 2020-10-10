const Discord = require("discord.js");

module.exports = (client) => { 
  const updateMembers = (guild) => {
    if ( guild.channels.cache.some( channel => channel.name === `Members: ${guild.memberCount.toLocaleString()}` )) return;
    guild.channels.create(`Members: ${guild.memberCount.toLocaleString()}`, {type: 'voice',
      permissionOverwrites: [
         {
           id: guild.id,
           deny: ['CONNECT'],
        },
      ],
    })
  } 
  
  const guild = client.guilds.cache.get('484832303672197153', '740070599375847556')
  updateMembers(guild)
}