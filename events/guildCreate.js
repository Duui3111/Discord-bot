const { dprefix } = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = async (guild, message) => {
    var found = false;
    guild.channels.cache.forEach(function(channel, id) {
    if(found == true || channel.type != "text") {
      return;
    }
    if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
      found = true;
      const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`**Hello, I'm Not a bot**\nThanks for inviting me to your Server\nThe prefix for all my commands is \`${dprefix}\` e.g: \`${dprefix}help\``);
      channel.send({embed})
    } 
  }) 
}