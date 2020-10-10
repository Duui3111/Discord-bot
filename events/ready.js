const config  = require("../config.json");
const memberCount = require("./member-count");

module.exports = async (client) => {   
    memberCount(client)
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity(`${config.activity.status}`, {
        type: `${config.activity.type}`, 
        url: `https://www.twitch.tv` 
    });
}