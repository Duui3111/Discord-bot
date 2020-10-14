const base64 = require('base-64');

module.exports = {
    name: "encode",
    description: "encodes a string",
    category: "utililty",
    aliases: ["encode"],
    run: (client, message, args) => {
        try{
            let str = base64.encode(args.join(" "));
            message.channel.send(`\`\`\`${String(str)}\`\`\``); 
        } catch(e) {
            return message.channel.send("InvalidCharacterError");
        }
    }
}