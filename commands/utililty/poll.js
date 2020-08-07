const Discord = require("discord.js");
const { dprefix } = require("../../config.json");
const db = require('quick.db');

module.exports = {
  name: "poll",
  category: "utililty",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send(`You do not have admin, ${message.author.username}`);

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = dprefix;

    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) {
      return message.channel.send(`${prefix}poll #channel question`);
    }
    let question = message.content.split(`poll ${channel} `).join("").slice(prefix.length).trim();
    if (!question)
      return message.channel.send(`You did not specify your question!`);
    const Embed = new Discord.MessageEmbed()
      .setTitle(`New poll!`)
      .setDescription(`${question}`)
      .setFooter(`${message.author.username} created this poll.`)
      .setColor(`RANDOM`);
    let msg = await client.channels.cache.get(channel.id).send(Embed);
    await msg.react("👍");
    await msg.react("👎");
  },
};