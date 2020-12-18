const db = require("quick.db")

module.exports = {
  name: "enablerank",
  usage: "enablerank",
  description: "enables the rank",
  category: "level stuff", 
  run: (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: You need `MANAGE_MESSAGES` perms to use this command")
    
    db.set(`dirank_${message.guild.id}`, false)
    return message.channel.send("rank message has ben enabled")
  }
}
