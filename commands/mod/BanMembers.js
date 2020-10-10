module.exports = {
    name: "ban",
    category: "moderation",
    aliases: ["ban"],
    description:"ban a user in your server",
    usage: "ban <user> <reason>",
    run: async (client, message, args) => {
      if (!message.guild) return;

      //if (!message.member.roles.cache .find(r => ['owner', 'Owner', 'OWNERS',  'OWNER', 'admin', 'senior admin', 'moderator privileges'].includes(r.name))) return message.channel.send("You don't have permissions to do that.")
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permissions to do that.");
      const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
  }
    }
};