module.exports = {
    name: "Message Adder",
    aliases: ["none"],
    description: "Adds messages",

    execute(message) {
        const fs = require('fs');
        const messages = require(`../Scores/${message.guild.id}.json`);

        if (!messages[message.author.id]) {
            messages[message.author.id] = {
                messages: 0,
                ping: message.author.toString()
            }
        }

        messages[message.author.id] = {
            messages: parseFloat(messages[message.author.id].messages) + 1,
            ping: message.author.toString()
        }

        fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify(messages), err => {
            if (err) {
                console.log(err);
                message.channel.send(err);
            }
        });
    }
}