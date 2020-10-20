const Discord = require("discord.js");
const { utc } = require("moment");

module.exports = {
  name: "botstats",
  aliases: ["bot-stats", "botinfo"],
  category: "info",
  description: "Get botinfo",
  usage: "botinfo",
  run: async (client, message, args, data) => {
    let uptime = convertMS(message.client.uptime);
    let totalGuilds = client.guilds.cache.size;
    let users = client.users.cache.size;
    let channels = client.channels.cache.size
    let discord = Discord.version;
    let node = process.versions.node;

    let Embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} stats`, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("RANDAM");

    if (uptime.day > 0) Embed.addField("Uptime", `${uptime.day} days ${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`)
    else if (uptime.hour > 0) Embed.addField("Uptime", `${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`)
    else if (uptime.minute > 0) Embed.addField("Uptime", `${uptime.minute} minutes ${uptime.seconds} seconds`)
    else if (uptime.seconds > 0) Embed.addField("Uptime", `${uptime.seconds} seconds`)
    else Embed.addField("Uptime", `IDK :sob:`)


    Embed.addField("Servers", totalGuilds, true)
    Embed.addField("Users", users, true)
    Embed.addField("Channels", channels, true)
    Embed.addField("Commands", client.commands.size, true)
    Embed.addField("Discord.js", discord, true)
    Embed.addField("Node.js", node, true)
    Embed.addField("Discord Support", "[bot Support](https://discord.gg/EhftPru)", true)
    Embed.addField("Invite", "[Invite Me](https://discord.com/oauth2/authorize?client_id=735698663027900470&scope=bot&permissions=8)", true)
    Embed.addField("Platform", process.platform, true)
    Embed.addField("Total Memory", formatSizeUnits(process.memoryUsage().heapTotal), true)
    Embed.addField("Used Memory", formatSizeUnits(process.memoryUsage().heapUsed), true)
    Embed.addField("Created at", utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss'), true)

    return message.channel.send(Embed)
  },
};

function convertMS(milliseconds) {
  var day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return { day: day, hour: hour, minute: minute, seconds: seconds };
}

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
  else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
  else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
  else if (bytes > 1) { bytes = bytes + " bytes"; }
  else if (bytes == 1) { bytes = bytes + " byte"; }
  else { bytes = "0 bytes"; }
  return bytes;
}