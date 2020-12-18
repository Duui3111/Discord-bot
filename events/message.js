const { Client, Message, Collection } = require("discord.js");
const { dprefix } = require("../config.json");
const db = require('quick.db');


module.exports  = async (client, message) => {
  if (!message.guild || message.author.bot) return;
   
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if(prefix === null) prefix = dprefix;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase(); 
   
  let xp = client.db.add(`xp_${message.author.id}_${message.guild.id}`, 1);
  let level = Math.floor(0.3 * Math.sqrt(xp));
  let lvl = client.db.get(`level_${message.author.id}_${message.guild.id}`) || client.db.set(`level_${message.author.id}_${message.guild.id}`,1);;
  if (level > lvl) {
    let newLevel = client.db.set(`level_${message.author.id}_${message.guild.id}`,level);
    if(db.get(`dirank_${message.guild.id}`) === true) return; else
    message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`);
  }

  // if(cmd.length === 0) return;
  // let cmdx = client.db.get(`cmd_${message.guild.id}`)
  // let cmdy = cmdx.find(x => x.name === cmd)
  // if(cmdx) if(cmdy) message.channel.send(cmdy.responce)
   

  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;
  if(command) return command.run(client, message, args, prefix);
} 

