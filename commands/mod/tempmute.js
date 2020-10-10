const Discord = require("discord.js");
const ms = require("ms");

module.exports= {
    name: "tempmute",
    category: "moderation",
    aliases: ["tempmute"],
    description:"ttempmute a user in your server",
    usage: "tempmute <user> <time> <reason>",
    run: async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("you do not have accses to use that command")
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.cache.find(x => x.name === "Muted");
  if(!muterole) return message.reply("This server do not have role with name `Muted` with permission of not to sned messages")
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.roles.add(muterole.id));
  message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
  }, ms(mutetime));

  }  
}