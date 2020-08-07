
module.exports = {
  name: "invite",
  category: "utililty",
run: async (client, message, args) => {
    const embed = {
      "color": 11650,
      "author": {
        "name": "Invite the bot"
      },
      "fields": [
        {
          "name": "‎‎ ‎‎‎",
          "value": "[**invite the bot in your server**](https://discord.com/oauth2/authorize?client_id=735698663027900470&scope=bot&permissions=8)" 
        },
      ]
    };
    message.channel.send({ embed });
}
}

