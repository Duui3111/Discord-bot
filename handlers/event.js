const { Client } = require("discord.js");
const message = require("../events/message");

const reqEvent = (event) => require(`../events/${event}`)

module.exports = Client => { 
    Client.on("ready", function() {reqEvent("ready")(Client)});
}