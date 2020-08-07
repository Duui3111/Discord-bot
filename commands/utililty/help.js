const { MessageEmbed, Guild } = require("discord.js");
const { dprefix } = require("../../config.json");
const db = require('quick.db');

module.exports = {
  name: "help",
  aliases: ["h"],
  description:"Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "utililty",
  run: async (client, message, args) => {
   
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = dprefix;

   
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("aliases", "`" + command.aliases + "`" || "Not Provied")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;
      let guild = message.guild
      let sname = guild != undefined ? guild.name : null
      let emx = new MessageEmbed()
        .setDescription(`Available commands in **${sname}**`)
        .setColor("GREEN")
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`You can do ${prefix}help <cmd> to see aditional info!`)
        .setTimestamp();

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`"+ prefix + value.join("`, `" + prefix) + "`"; 

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc)
        emx.setTimestamp();
      }

     return message.channel.send(emx);
    }
  }
}
