const { MessageEmbed } = require("discord.js");
const { dprefix } = require("../../config.json");
const db = require('quick.db');

module.exports = {
  name: "deleterole",
  category: "roles",

  run: async (client, message, args) => {

    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(`You do not have admin, ${message.author.username}`);
    
      let roleDelete = message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find((r) => r.name == args[0]);
      if (!roleDelete)
        return message.channel.send(`You did not specify the name or id of the role you wish to delete!`);

      roleDelete.delete();
      const Embed1 = new MessageEmbed()
        .setTitle(`Deleted role!`)
        .setColor(roleDelete.color)
        .setDescription(`${message.author.username} has deleted the role "${roleDelete.name}"\nIts ID: ${roleDelete.id}\nIts Hex Color Code: ${roleDelete.color}`);
      message.channel.send(Embed1);
  },
};