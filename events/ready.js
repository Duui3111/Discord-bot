const Discord = require("discord.js");
const config  = require("../config.json");
const memberCount = require("./member-count");

module.exports = async (client) => {   
    memberCount(client)
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity(`${config.activity.status}`, {
        type: `${config.activity.type}`, 
        url: `https://www.twitch.tv` 
    });
//     let fetch = require("node-fetch") 
// fetch(`http://localhost:8080/api/auth/stats/735698663027900470`, {
//       method: "POST",
//       headers: {
//       Authorization: "lDNXWQDxqoIgw8vYe3lc",
//       "Content-Type": "application/json"
//       },
//      body: JSON.stringify({"server_count": client.guilds.cache.size})
//     }).then(response => response.text())
// .then(console.log)
// .catch(console.error)
}

// let prefix = await db.get(`prefix_${message.guilds.id}`);
// if(prefix === null) prefix = config.dprefix;
// console.log(`\nWatching ${client.users.cache.filter(u => u.id !== '1').size} users in ${client.guilds.cache.size} servers bot prefix is ${config.dprefix}`);
// client.generateInvite(["ADMINISTRATOR"]).then(link => {
//     console.log("\nINVITE BOT:\n" + link);
// })

