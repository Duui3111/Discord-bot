const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "announce",
  description: "Get the bot to say what ever you want in a specific channel.",
  usage: "<channel id> <msg>",
  category: "utililty",
  run: async (client, message, args, prefix) => {
    let rChannel =  message.guild.channels.cache.find(c => c.name.includes(args.join(' '))) ||  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!rChannel) return message.channel.send(`You did not specify your channel to send the announcement too!`);
    let MSG = message.content.split(`${prefix}announce ${rChannel} `).join("");
    if (!MSG) return message.channel.send(`You did not specify your message to send!`);
    const Embed = new MessageEmbed()
      .setTitle(`New announcement!`)
      .setDescription(`${MSG}`)
      .setColor("RANDOM");
    rChannel.send(Embed);
    message.channel.send("you have send a announce to " + rChannel.name)
  },
};