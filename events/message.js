const { Client, Message, Collection } = require("discord.js");
const { dprefix } = require("../config.json");
const db = require('quick.db');


module.exports  = async (client, message) => {
    if (!message.guild || message.author.bot) return;
   
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = dprefix;
   
   let xp = client.db.add(`xp_${message.author.id}`, 1);
   let level = Math.floor(0.3 * Math.sqrt(xp));
   let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
   if (level > lvl) {
       let newLevel = client.db.set(`level_${message.author.id}`,level);
       message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`);
   }
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase(); 
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    command.run(client, message, args);
} 
