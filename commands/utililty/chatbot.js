const fetch = require('node-fetch');

module.exports = {
    name: "chatbot",
    category: "utililty",
   run: async (client, message, args) => {
    let query = args.join(" ");
    if (!query) return message.channel.send("i can't just search the air");
    fetch(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(chatbot => message.channel.send(chatbot.response))
  }
}
