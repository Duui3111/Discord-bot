const eco = require("discord-economy");

module.exports = {
    name: "transfer",
    category: "economy",
    run: async (client, message, args) => {
        var user = message.mentions.users.first()
        var amount = args[1]
     
        if (!user) return message.reply('Reply the user you want to send money to!')
        if (!amount) return message.reply('Specify the amount you want to pay!')
     
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to transfer!')
     
        var transfer = await eco.Transfer(message.author.id, user.id, amount)
        message.reply(`Transfering coins successfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
  }
}