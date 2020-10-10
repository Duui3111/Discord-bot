const { Client, Collection, MessageEmbed } = require("discord.js");
const { dprefix, token, youtube_api } = require("./config.json")
const client = new Client()

const { Player } = require("discord-player"); 
const player = new Player(client, youtube_api); 
client.player = player;

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
 
["event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async (message) => {
    message.member; 
    message.author; 
    require("./events/message")(client, message); 
});

client.on("guildMemberAdd", member => {
  const guild = member.guild; 
  require("./events/guildMemberAdd")(member, guild); 
})

client.on("guildCreate", guild => {
  require("./events/guildCreate")(guild);
});

const db = require('quick.db');

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  require("./events/messageDelete")(client, message, channel);
})

client.db = require("quick.db");

client.on("message", async message => {
  if (message.author.bot) return; 
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if(prefix === null) prefix = dprefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let cmdx = db.get(`cmd_${message.guild.id}`)
  if(cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if(cmdy) message.channel.send(cmdy.responce)
  }
})


client.login(token);
