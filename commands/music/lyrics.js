// const fetch = require('node-fetch');
// const { MessageAttachment, MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "lyrics",
//     category: "music",
//    run: async (client, message, args) => {
//         let query = args.join(" ");
//         if (!query) return message.channel.send("i can't just search the air");
//         fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(query)}`)
//         .then(res => res.json())
//         .then(lyrics => {    
//        if(lyrics.error) message.reply("no lyrics found");
//        const embed = new MessageEmbed()
//        .setAuthor(lyrics.title || null)
//        .setThumbnail(lyrics.thumbnail.genius || null)
//        .addField("song name", lyrics.title || null, true)
//        .addField("song author", lyrics.author || null, true)
//        .addField("lyrics", new MessageAttachment(lyrics.lyrics, `${lyrics.title}.txt`) || null)
//        .setTimestamp()
        
//        return message.channel.send(embed);
//     })
//   }
// }
