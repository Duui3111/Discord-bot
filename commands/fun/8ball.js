const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "8ball",
  category: "fun",
  run: async (bot, message, args) => {   
    if (!args[0]) return message.channel.send(`You did not specify your question!`);
    else {
      let responses = [ "Yes", "No", "Definetly", "Absoloutely", "Not in a million years", ];
      let response = responses[Math.floor(Math.random() * responses.length)];
      let Embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(`8Ball!`)
        .setDescription(`Your question: ${message.content.slice(7)}\nMy reply: ${response}`)
        .setColor(`RANDOM`);
      message.channel.send(Embed);
    }
  },
};