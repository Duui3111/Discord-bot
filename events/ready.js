const memberCount = require("./member-count");

module.exports = async (client) => {   
    memberCount(client);
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity({
        name: `$help`, 
        type: `PLAYING`,
    });
}
