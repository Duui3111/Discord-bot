const { MessageEmbed } = require("discord.js");
const { dprefix } = require("../../config.json");
const db = require('quick.db');

module.exports = {
  name: "8ball",
  category: "fun",
  run: async (bot, message, args) => {
        
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = dprefix;

    let question = message.content.slice(prefix.length + 6);
    if (!question)
      return message.channel.send(`You did not specify your question!`);
    else {
      let responses = [
        "Yes",
        "No",
        "Definetly",
        "Absoloutely",
        "Not in a million years",
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
      let Embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(`8Ball!`)
        .setDescription(`Your question: ${question}\nMy reply: ${response}`)
        .setColor(`RANDOM`);
      message.channel.send(Embed);
    }
  },
};