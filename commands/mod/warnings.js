// const { MessageEmbed } = require("discord.js")
// const db = require("quick.db")

// module.exports = {
//   name: "warnings",
//   category: "moderation",
//   usage: "warnins <user>",
//   aliases: ["warnings"],
//   description:"warnings of a user",
//   run: async (client, message, args) => {   
//     const user = message.mentions.members.first() || message.author

//     let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

//    if(!user) return message.channel.send("Please Mention the person to get warnings of")  
// //    if(warnings === null) warnings = 0;
   
//     if(warnings === null) message.channel.send(`${user.tag} has 0 warnings`)


//     const embed =  new MessageEmbed()
//     .setAuthor(`warnings | ${user}`)
//     .setColor("RED")
//     .setDescription(warnings)
//     return message.channel.send(embed)   
//   } 
// }
