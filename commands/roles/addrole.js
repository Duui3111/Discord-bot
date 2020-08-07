const { Channel } = require("discord.js");

module.exports = {
    name: "addrole",
    category: "roles",
    run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permissions to do that.");
    const mentionedUser = message.mentions. members.first();
    const member = mentionedUser
    if(!member) return message.channel.send("addrole <member> <role>")
    const role = message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
    if(!role) return message.channel.send("plz say a role, role not found ");
    await member.roles.add(role.id), message.channel.send(`**${member} now has the ${role} role**`)
  } 
}