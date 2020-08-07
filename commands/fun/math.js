const math = require('mathjs');
const Discord = require('discord.js');

module.exports = {
    name: "math",
    description: "Get the answer to a math problem",
    aliases: ["math"],
    category: "fun",
    run: async (client, message, args) => {

        if(!args[0]) return message.channel.send('Please provide a question');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a **valid** question')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Calculator')
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}