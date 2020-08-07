const { dprefix } = require("../../config.json")
const db = require('quick.db');

module.exports = {
    name: "rockPaperScissors",
    aliases: ["rps"],
    category: "fun",
    run: async (client, message, args) => {
            
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = dprefix;

    const acceptedReplies = ['rock', 'paper', 'scissors'];
    const random = Math.floor((Math.random() * acceptedReplies.length));
    const result = acceptedReplies[random];

    const choice = args[0];
    if (!choice) return message.channel.send(`How to play: \`${prefix}rps <rock|paper|scissors>\``);
    if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
    
    if (result === choice) return message.reply("It's a tie! We had the same choice.");
    
    switch (choice) {
        case 'rock': {
            if (result === 'paper') return message.reply('I won!');
            else return message.reply('You won!');
        }
        case 'paper': {
            if (result === 'scissors') return message.reply('I won!');
            else return message.reply('You won!');        
        }
        case 'scissors': {
            if (result === 'rock') return message.reply('I won!');
            else return message.reply('You won!');
        }
        default: {
            return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
        }
     }
    }
}