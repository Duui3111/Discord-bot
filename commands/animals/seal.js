// const {  MessageEmbed } = require("discord.js")
// const fetch = require('node-fetch');

// module.exports = { 
//         name: "seal",
//         description: "Sends a picture of a seal!",
//         usage: "seal",
//         category: "fun",
//     run: async (bot, message, args) => {

//         fetch("https://apis.duncte123.me/seal")
//         .then(res => res.json()).then(body => {
//             if(!body) return message.reply(" whoops. I broke, try again!")

//             let embed = new MessageEmbed()
//             .setColor("RED")
//             .setAuthor(`Seal!`, message.guild.iconURL)
//             .setImage(body.data.file)
//             .setTimestamp()
//             message.channel.send({embed})
//         })
//     }
// }