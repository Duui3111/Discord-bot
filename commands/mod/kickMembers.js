module.exports = {
  name: "kick",
  category: "moderation",
  aliases: ["kick"],
  description:"kicks a user in your server",
  usage: "kick <user> <reason>",
run: async (client, message, args) => {
    if (!message.guild) return;
    //if (message.content.startsWith('!kick')) {
        //if (!message.member.roles.cache .find(r => ['owner', 'Owner', 'OWNERS',  'OWNER', 'admin', 'senior admin', 'moderator privileges'].includes(r.name))) return message.channel.send("You don't have permissions to do that.")
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permissions to do that.");
   
        const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              message.reply('I was unable to kick the member');
              console.error(err);
            });
        } else {
          message.reply("That user isn't in this guild!");
        }
      } else {
        message.reply("You didn't mention the user to kick!");
      }   
    }
}; 


