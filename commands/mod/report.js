const { MessageEmbed } = require("discord.js");
const { dprefix } = require("../../config.json");
const db = require('quick.db');

module.exports ={
    name: "report",
    category: "moderation",
    aliases: ["report"],
    description: "report user in your server ",
    usage: "report <user> <reason>",
    run: async(client, message, args) => {       
 
        let prefix = await db.get(`prefix_${message.guild.id}`);
        if(prefix === null) prefix = dprefix;       
        
        const retart = message.mentions.users.first();   
        if(!retart) return message.channel.send("plz mentions the a user to report");      
        
        let reason = args.join(" ").slice(22);
        if(!reason) return message.channel.send("plz give a reasen to report the user"); 

        let reportsChannel  = message.guild.channels.cache.find((x) => (x.name === "reports" || x.name === "report"))
        if(!reportsChannel) return message.channel.send("Couldn't find reports channel.");
        
        message.channel.send("send the report to the reports channel")
       
        const embed = new MessageEmbed()
        .setTitle(`reported by ${message.author.tag}`)
        .addField(`report user`, retart)
        .addField("Reason", reason)    
        return reportsChannel.send(embed);
    }
} 