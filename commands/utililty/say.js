module.exports = {
   name: "say",
    category: "utililty",
    aliases: ["say"],
    description:"say",
    usage: "say",  
   run: async (client, message, args) => {
        message.channel.send(args.join(" "));
    }
} 
