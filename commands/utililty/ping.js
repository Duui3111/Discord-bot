module.exports = {
    name: "ping",
    category: "utililty",
    aliases: ["ping"],
    description:"ping the api to the bot",
    usage: "ping",
    run: async (client, message, args) => {
    return message.reply("Pong! "+Math.round(client.ws.ping));
  }
}
