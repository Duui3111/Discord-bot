const eco = require("discord-economy");
const { arg } = require("mathjs");

module.exports = {
    name: "balance",
    aliases: ["bal"],
    category: "economy",
    run: async (client, message, args) => {
        var output = await eco.FetchBalance(message.author.id)
        message.channel.send(`Hey ${message.author.tag}! You own ${output.balance} coins.`);
  }
}
