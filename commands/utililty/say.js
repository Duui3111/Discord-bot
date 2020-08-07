module.exports = {
   name: "say",
    category: "utililty",
run: async (client, message, args) => {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

}
} 
