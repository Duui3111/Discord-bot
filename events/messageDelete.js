module.exports = async (client, message, channel) =>{
    client.snipes.set(message.channel.id, {
        content:message.content,
        author:message.author.tag,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null
    })
}