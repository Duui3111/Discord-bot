const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

  module.exports = {
    name: "rank",
    aliases: ["rank"],
    description:"rank stuff and ppl rank",
    usage: "rank | rank <player>",
    category: "level stuff",
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
    let level = client.db.get(`level_${user.id}_${message.guild.id}`) || 0;
    let exp = client.db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    let neededXP = Math.floor(Math.pow(level / 0.1, 2));
  
    let every = client.db.all().filter(i => i.ID.startsWith(`xp_`) && i.ID.endsWith(`${message.guild.id}`)).sort((a, b) => b.data - a.data);
    let rank = every.map(x => x.ID).indexOf(`xp_${user.id}_${message.guild.id}`) + 1;
    
    const card = new canvacord.Rank()
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setRank(rank)
      .setLevel(level)
      .setCurrentXP(exp)
      .setRequiredXP(neededXP)
      .setStatus(user.presence.status, true)
      .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));
  
    card.build().then(img => {
       return message.channel.send(new MessageAttachment(img, "rank.png"));
    })  
  }
} 