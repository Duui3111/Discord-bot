// const Discord = require("discord.js")
// const superagent = require("superagent")


// module.exports = {
//     name: "dog",
//     aliases: "dog",
//     description: "Sends a picture of a dog!",
//     usage: "dog",
//     aliases: ["doggo", "puppy"],
//     category: "fun",
//     run: async (client, message, args) => {

//     let {body} = await superagent
//     .get(`https://dog.ceo/api/breeds/image/random`)
//     if(!{body}) return message.channel.send("I broke! Try again.")

//         let dEmbed = new Discord.MessageEmbed()
//         .setColor("RED")
//         .setAuthor(message.guild.iconURL)
//         .setImage(body.message)
//         .setTimestamp()

//         message.channel.send({embed: dEmbed})
//     }
// }
