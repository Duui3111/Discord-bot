module.exports = {
    name: "ping",
    category: "utililty",
    run: async (client, message, args) => {
    return message.reply("Pong! "+Math.round(client.ws.ping));
  }
}
