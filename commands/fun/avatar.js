const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  category: "fun",
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const embed = new MessageEmbed()
    .setImage(user.displayAvatarURL())
    .setColor("RANDOM")
    message.channel.send({embed});
  }
}
