const memberCount = require("./member-count");
const { dprefix } = require("./../config.json");
// const { Guild, Message } = require("discord.js");
const db = require("quick.db");


module.exports = async (client) => {   
    memberCount(client);
    // let prefix = await db.get(`prefix_${message.guild.id}`);
    // if(prefix === null) prefix = dprefix;
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity({
        name: `$help || @me prifix`, 
        type: `PLAYING`,
    });
}
