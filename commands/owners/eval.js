const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "eval",
    aliases: ["e"],
    category: "dev",
    run: async (client, message, args) => {
        if (message.author.id !== "480423869040295959") {
            const embed = new MessageEmbed()
                .setTitle(":x: **ERROR**")
                .setDescription("this is a owner only Command\t\t\t\t\t")
                .setColor(0xFF0000)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({ embed });
        }

        if (args.length < 1) {
            const embed = new MessageEmbed()
                .setTitle(":x: **ERROR**")
                .setDescription("Missing Arguments\t\t\t\t\t")
                .setColor(0xFF0000)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({ embed });
        }

        const code = args.join(" ");

        try {
            let embed = new MessageEmbed();

            let evaled = eval(args.join(" "));
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            embed = embed
                .addField("Evaluated", `\`\`\`${clean(evaled)}\t\t\t\t\t\`\`\``)
                .addField("Type Of", `\`\`\`${typeof evaled}‎‎‎\t\t\t\t\t\`\`\``)
                .setColor(0x00FF00)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp();

            message.channel.send({ embed });
        } catch (error) {
            let embed = new MessageEmbed();

            if (code !== null) {
                embed = embed.addField(":inbox_tray: Input", `\`\`\`js\n${code}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\`\`\``);
            }

            embed = embed
                 .setTitle(":x: ERROR")
                .setDescription(`\`\`\`js\n${error}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\`\`\``)
                .setColor(0xFF0000)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()

            message.channel.send({ embed });
        }
    }
}

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}