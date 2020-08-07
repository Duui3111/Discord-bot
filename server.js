const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
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
client.on('message', async message => {
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if(prefix === null) prefix = dprefix;
  if (!message.content.startsWith(prefix)) return;	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);	
	let args = message.content.split(" ").slice(1);
     if (command === "sayEmbed") {
    const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setDescription(args.join(" "));
		message.channel.send({embed})
	}  
});

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  require("./events/messageDelete")(client, message, channel);
})

const Canvacord = require("canvacord");
const message = require("./events/message");
const ready = require("./events/ready");
client.db = require("quick.db");
client.canvas = new Canvacord();


client.on('message', message => {
  if (message.author.bot) return;
  if(message.channel.type === 'dm') return message.reply('hello')
});

client.login(token);
