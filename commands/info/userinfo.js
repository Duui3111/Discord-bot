const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    description:"Get userinfo",
    category: "info",
    usage: "userinfo | userinfo <user>",
    run: async (client, message, args, data) =>{
        let user = message.mentions.users.first() || message.author;
      let userID = user.id;
      let userName = user.tag;
      let joinedDate = user.createdAt;
      let userStatus = user.presence.status;
      let member = null;
      if(message.guild){
          member = await message.guild.members.fetch(user).catch((err) => {});
      }
      let memberColor = member.displayHexColor;
      let memberHRole = member.roles.highest;
      let memberJoined = member.joinedAt;
      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL())
      .setColor(config.color)
      .addFields(
        { name: 'Username', value: userName, inline: true },
        { name: 'Created Discord', value: joinedDate.toLocaleDateString(), inline: false },
        { name: 'Joined server', value: memberJoined.toLocaleDateString(), inline: false },
        { name: 'Member color', value: memberColor, inline: true },
        { name: 'Highest role', value: member.roles.highest, inline: true },
        { name: 'Total roles', value: member.roles.cache.size, inline: true },
      )
       if(userStatus === "dnd"){
         announcementEmbed.addFields({ name: 'Status', value: ":red_circle: Do not disturb", inline: true })
       }else if(userStatus === "idle"){
         announcementEmbed.addFields({ name: 'Status', value: ":yellow_circle: Idle", inline: true })
       }else if(userStatus === "online"){
           announcementEmbed.addFields({ name: 'Status', value: ":green_circle: Online", inline: true })
       }else if(userStatus === "offline"){
           announcementEmbed.addFields({ name: 'Status', value: ":white_circle: Offline", inline: true })
       }else{
          announcementEmbed.addFields({ name: 'Status', value: "Unknown", inline: true })
       }

      return message.channel.send(announcementEmbed)
    },
};