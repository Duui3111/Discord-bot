const { Channel } = require("discord.js");

module.exports = {
    name: "removerole",
    category: "roles",
    run: async (client, message, args) => {
    const mentionedUser = message.mentions. members.first();
    const member = mentionedUser
    if(!member) return message.channel.send("removerole <member> <role> ")
    const role = message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
    if(!role) return message.channel.send("plz say a role to remove, role not found");
    await member.roles.remove(role.id), message.channel.send(`**${member} now does not have ${role} role**`)
  } 
}