const Discord = require("discord.js");
const moment  = require("moment");

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    description:"Get userinfo",
    category: "info",
    usage: "userinfo | userinfo <user>",
    run: async (client, message, args) => {
      try {

        let user = message.mentions.users.first() || message.author || message.guild.members.cache.get(args[0]);
        let member = null;
        if(message.guild) member = await message.guild.members.fetch(user);

        let everyne = member.roles.highest === '@everyone'; 
  
        const status = {
          online: ":green_circle: Online",
          idle: ":yellow_circle: Idle",
          dnd: ":red_circle: Do Not Disturb",
          offline: ":white_circle: Offline/Invisible"
        }
    
        const flags =  {
          DISCORD_EMPLOYEE: '<:DiscordStaff:765966019951853568>',
          DISCORD_PARTNER: '<:new_discord_partner_2:765972811692507156>',
          HYPESQUAD_EVENTS: '<:events:765973416272068619>',
          BUGHUNTER_LEVEL_1: '<:BugHunter:765972159347687455>',
          HOUSE_BRAVERY: '<:hypesquadbravery:765966302237949953>',
          HOUSE_BRILLIANCE: '<:brilliance:765970685801529375>',
          HOUSE_BALANCE: '<:balance:765972811483054111>',
          EARLY_SUPPORTER: '<:earlysupporter:765971394755952670>',
          TEAM_USER: 'TEAM_USER',
          SYSTEM: 'SYSTEM',
          BOT: '<:bot:765974336217546752>',
          BUGHUNTER_LEVEL_2: '<:BugHunterLvl2:765972159323045888>',
          VERIFIED_BOT: '<:VERIFIED_BOT:765973733134434335> ',
          VERIFIED_DEVELOPER: '<:VERIFIED_DEVELOPER:765973733588336660>',
          DISCORD_NITRO: '<:nitro:765971761996496946>'
        }
      
        const flagMap = user.flags.toArray().map(flag => flags[flag]);
        if (user.avatar && user.avatar.startsWith("a_")) flagMap.push(flags.DISCORD_NITRO);
        if (member.user.bot === true) flagMap.push(flags.BOT);
        

        let Embed = new Discord.MessageEmbed()
        .setAuthor(user.username, user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
        .setTitle(user.tag, true) 
        .addField("Username", member.user.username, true) 
        .addField("ID", member.user.id, true)
        .addField("Nickname", member.nickname || "None", true)
        .addField('User Discriminator', `#${member.user.discriminator}`, true)
        .addField("Member Color",  member.displayHexColor, true)
        .addField("Highest Role", member.roles.highest, true)
        .addField("Total Roles", member.roles.cache.size, true)
        .addField("Bot", member.user.bot === true ? "Yes" : "No" , true)
        .addField('badges' , flagMap.length ? flagMap.join("**|** ") : "None",  true)
        .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Not playing"}`, true)
        // .addField('**Boosting Since**', `\`${member.premiumSinceTimestamp || 'Never Boosted'}\``, true)
        .addField("Boost Count", `${member.premiumSubscriptionCount || '0'}`, true)
        .addField("Status", status[member.user.presence.status], true)    
        if(member.user.presence.status == 'online' || member.user.presence.status ==  'idle' || member.user.presence.status == 'dnd')
        Embed.addField("Device",  user.presence.clientStatus.mobile ? "mobile" : null || user.presence.clientStatus.web ? "web" : null || user.presence.clientStatus.desktop ? "desktop" : null || "None", true)
        else if(member.user.presence.status == 'offline')
        Embed.addField("Device",  "user offline/Invisible/bot", true)  
        Embed.addField("Created Discord", moment(member.user.createdAt).format('lll') + '\n*' + moment(new Date()).diff(member.user.createdAt, 'days') + ' days ago*', true)
        Embed.addField("Joined Server",  moment(member.joinedAt).format('lll') + '\n*' + moment(new Date()).diff(member.joinedAt, 'days') + ' days ago*', true)
        Embed.setTimestamp()
  
        return message.channel.send(Embed)
      } catch(e) {
        message.channel.send("cant get userinfo 😔");
      }
    }
};