module.exports = {
        name: "purge",
        usage: "!purge <amount of messages>",
        category: "mod",

    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You should have admin perms to use this command!")
 
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

        let cmd = message.content.split(" ")[0]; //because command aliases
        if(isNaN(args[0])) return message.channel.send(`Usage: ${cmd} (number of messages)`); //must be number not word
        if (args[0] > 100) return message.channel.send("No deleting over 100 messages at a time to prevent lag, please!");
        if(args[0] == 0) return message.channel.send("You cannot delete 0 messages!");      
        const fetched = await message.channel.messages.fetch({limit: args[0]});   
       
        try {
            await message.channel.bulkDelete(fetched);
            if (args[0] > 40) {
                message.channel.send(`Successfully deleted ${args[0]} messages`).then(msg => msg.delete(2000));
            } else return;
        } catch(e) {
            let id = second.getError(e.message);
            message.channel.send(`**-Unfortunately an error occurred. Error ID: ${id}**`);
        }
    }
}