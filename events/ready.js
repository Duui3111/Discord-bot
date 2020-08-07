const Discord = require("discord.js");
const config  = require("../config.json");
const db = require('quick.db');

module.exports = async (client) => {   
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity(`${config.activity.status}`, {
        type: `${config.activity.type}`, 
        url: `https://www.twitch.tv` 
    });
}

// let prefix = await db.get(`prefix_${message.guilds.id}`);
// if(prefix === null) prefix = config.dprefix;
// console.log(`\nWatching ${client.users.cache.filter(u => u.id !== '1').size} users in ${client.guilds.cache.size} servers bot prefix is ${config.dprefix}`);
// client.generateInvite(["ADMINISTRATOR"]).then(link => {
//     console.log("\nINVITE BOT:\n" + link);
// })
