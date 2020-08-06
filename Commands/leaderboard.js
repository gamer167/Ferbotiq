module.exports = {
    name: "leaderboard",
    aliases: ["leaderboard", "lb"],
    description: "Shows message leaderboard",

    execute(message) {
        const Discord = require('discord.js');
        const messages = require(`../Scores/${message.guild.id}.json`);

        var messagesArray = Object.entries(messages)
            .map(v => `${v[1].messages} - ${v[1].ping}`)
            .sort((a, b) => b.split(" - ")[0] - a.split(" - ")[0])
            .slice(0, 10);

        const embed = new Discord.MessageEmbed()
            .setTitle('Leaderboard')
            .setDescription('Message Leaderboard')
            .setAuthor(message.member.displayName)
            .setColor('BLURPLE')
            .addField('Messages:', messagesArray)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setFooter('Sub to Ferotiq on YouTube!');

        message.delete();
        message.reply(embed);
    }
}