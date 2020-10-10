const reqEvent = (event) => require(`../events/${event}`)

module.exports = Client => { 
    Client.on("ready", function() {reqEvent("ready")(Client)});
}