const figlet = require('figlet');
module.exports = {
  name: "ascii",
  aliases: ["ascii"],
  description:"i dont know what ascii is",
  usage: "ascii <txt>",
  category: "utililty",
  run: async (client, message, args) => { 
    const text = args.join(" ")
    figlet.text(text, (e, txt) => {
        if(e) return;
        message.channel.send(`\`\`\`${txt.trimRight()}\`\`\``)
    })
  } 
}
