module.exports = {
    name: "say",
    aliases: ["say", "s"],
    description: "Repeats a message",

    execute(message, args, bot) {
        if (!args[1]) return message.channel.send('What do you want to say?');
        let say = args.splice(1).join(" ");
        const channel = bot.channels.cache.get('717786042601832448');
        message.delete();
        channel.send(say);
    }
}