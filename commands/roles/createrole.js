const { dprefix } = require("../../config.json");
const db = require('quick.db');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "createrole", 
    category: "roles",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.channel.send(`You do not have admin, ${message.author.username}`);
            
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if(prefix === null) prefix = dprefix;
  
        let rName = message.content.split(`createrole`).join("").slice(dprefix.length).trim();
        let rColor;
        args.forEach((arg) => {
          if (arg.startsWith("#")) {
            rColor = arg;
          }
        });
  
        if (!rName) {
          return message.channel.send(`You did not specify a name for your role!`);
        }
  
        if (!rColor) {
          return message.channel.send(`You did not specify a color for your role!`);
        }
  
        if (rColor >= 16777215)
          return message.channel.send(`That hex color range was too big! Keep it between 0 and 16777215`);
  
        if (rColor <= 0)
          return message.channel.send(`That hex color range was too small! Keep it between 0 and 16777215`);
        rName = rName.replace(`${rColor}`, ``);
        let rNew = await message.guild.roles.create({
          data: {
            name: rName,
            color: rColor,
          },
        });
  
        const Embed = new MessageEmbed()
          .setTitle(`New role!`)
          .setDescription(`${message.author.username} has created the role "${rName}"\nIts Hex Color Code: ${rColor}\nIts ID: ${rNew.id}`)
          .setColor(rColor);
        message.channel.send(Embed);
    }
}