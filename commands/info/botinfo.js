const Discord = require("discord.js");
const config = require("../../config.json");
const moment = require("moment");
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = {
    name: "botstats",
    aliases: ["bot-stats", "botinfo"],
    category: "info",
    description:"Get botinfo",
    usage: "botinfo",
    run: async(client, message, args, data) => {
      let uptime = convertMS(message.client.uptime);
      let totalGuilds = client.guilds.cache.size;
      let users = client.users.cache.size;
      let channels = client.channels.cache.size
      let discord = Discord.version;
      let node = process.versions.node;

      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} stats`, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(config.color);

      if(uptime.day > 0){
        announcementEmbed.addFields({name: "Uptime", value: `${uptime.day} days ${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.hour > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.minute > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.seconds > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.seconds} seconds`})
      }else{
        announcementEmbed.addFields({ name: "Uptime", value: `IDK :sob:`})
      }

      announcementEmbed.addFields(
        { name: "Servers", value: totalGuilds, inline: true},
        { name: "Users", value: users, inline: true },
        { name: "Channels", value: channels, inline: true },
        { name: "Discord.js", value: discord, inline: true },
        { name: "Node.js", value: node, inline: true },
        { name: "Discord Support", value: "[bot discord](https://discord.gg/EhftPru)", inline: true },
      )

      announcementEmbed.addField("Platform", process.platform, true)
      announcementEmbed.addField("Total Memory", formatSizeUnits(process.memoryUsage().heapTotal), true)
      announcementEmbed.addField("Used Memory", formatSizeUnits(process.memoryUsage().heapUsed), true)
      announcementEmbed.addField("Created at", moment(client.user.createdAt).format('lll'), true)

      return message.channel.send(announcementEmbed)
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
  return { day: day,hour: hour, minute: minute, seconds: seconds };
}

function formatSizeUnits(bytes){
  if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
  else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
  else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
  else if (bytes > 1)           { bytes = bytes + " bytes"; }
  else if (bytes == 1)          { bytes = bytes + " byte"; }
  else                          { bytes = "0 bytes"; }
  return bytes;
}