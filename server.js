const { Client, Collection } = require("discord.js");
const { dprefix, token, youtube_api, mongodbUrl } = require("./config.json");
const client = new Client()

require("./dashboard/dashboard")(client);

const { Player } = require("discord-player"); 
const player = new Player(client, youtube_api); 
client.player = player;

client.commands = new Collection();
client.aliases = new Collection();

client.snipes = new Map();

client.db = require("quick.db");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


const requireAll = require('require-all');   
const files = requireAll({ dirname: `${__dirname}/events`, filter: /^(?!-)(.+)\.js$/ });                                          
client.removeAllListeners();                

for (const name in files) {                 
  const event = files[name];                                                           
  client.on(name, event.bind(null, client));                                             
}  

function clean(text) {
  if (typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
   else return text;
}

const db = require('quick.db');

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
});

client.on("message", async message => {
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if(prefix === null) prefix = dprefix;

  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== "480423869040295959") return;
    try {
      let evaled = eval(args.join(" "));
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

client.login(token);