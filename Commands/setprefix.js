module.exports = {
    name: "setprefix",
    aliases: ["setprefix", "sp"],
    description: "Sets the prefix of the server",

    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send('You do not have permission to use that command!');
        if (!args[1]) return message.channel.send('You did not supply a prefix!');
        const db = require('quick.db');

        db.set(`prefix_${message.guild.id}`, args[1]);
        message.delete();
        message.reply(`Prefix set to \`${args[1]}\``);
    }
}