const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "google",
    description: "google somthong",
    category: "fun",
    aliases: ["google"],
    run: async (client, message, args) => {
      let embed = new MessageEmbed()
      .setTitle("Search Results for " + args.join(" "))
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png")
      .setDescription("https://www.google.com/search?q="+args.join(" ").replace(/ /g, "+"))
      .setFooter("Google")
      .setTimestamp()
      return message.channel.send(embed)
    }
}