const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "info",
  aliases: ["si"],
  description:"Get serverinfo",
  usage: "serverinfo",
  run: async (bot, message, args) => {  
	const { guild } = message   
    const { name, region, memberCount, owner } = guild
    const icon = guild.iconURL()
    const embed = new Discord.MessageEmbed() 
      .setTitle(`Server info for ${name}`)
      .setThumbnail(icon)
      .addFields( 
        {
          name: 'Region',
          value: region,
        },
        {
          name: 'Members',
          value: memberCount,
        },
        {
            name: 'Members Online',
            value: `${message.guild.members.cache.filter(message => message.user.presence.status == "online").size}`
        },
        {
          name: 'Owner',
          value: owner.user.tag,
        },
		    {
          name: 'Verification Level',
          value: `${message.guild.verificationLevel}`,
        },
	    {
          name: 'Created',
          value: `${message.guild.createdAt}`,
        }
      )

    message.channel.send(embed)
}
   
} 
