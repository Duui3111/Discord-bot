const { MessageEmbed } = require("discord.js");
const { dprefix } = require("../../config.json");
const db = require('quick.db');

module.exports = {
  name: "bug",
  aliases: ["bug"],
  description:"if there is a bug with the bot you can report it",
  usage: "bug <bug>",
  category: "utililty",
  run: async (client, message, args) => { 
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = dprefix;  
    const bug = message.content.slice(prefix.length).split(`bug`).join("").replace(/,/gi,"")    
    if(!bug) return message.channel.send('Please provide a bug for it to be fixed');  
    client.channels.cache.get('741694526338367500').send(bug)
    message.channel.send("your bug as ben send")
  } 
}
