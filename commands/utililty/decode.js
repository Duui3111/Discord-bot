const base64 = require('base-64');

module.exports = {
    name: "decode",
    description: "decodes a string",
    category: "utililty",
    aliases: ["decode"],
    run: (client, message, args) => {
        try{
            let str = base64.decode(args.join(" "));
            message.channel.send(`\`\`\`${String(str)}\`\`\``); 
        } catch(e) {
            return message.channel.send("InvalidCharacterError");
        }
    }
}