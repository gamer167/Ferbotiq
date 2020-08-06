const Discord = require('discord.js');
const bot = new Discord.Client();

const db = require('quick.db');

const {
    token
} = require('./Data/config.json');

const fs = require('fs');

// If you find any code like this in your main file, then it is your command handler provided by me or discord.js documentation
// as you can see I use the variable "bot.commands" while the documentation uses "message.client.commands" or something similar, keep that in mind, we will be using this collection
// If you aren't using this command handler, then you can instead do this help command by hardcoding in all the information for each command, or you can follow my tut on command handler
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    bot.commands.set(command.name, command);
};

bot.on('ready', () => {
    console.log('Bot is on!');
    bot.channels.cache.get('717734409889120268').send('Bot is on!');
});

bot.on('message', message => {


    // Since we are using a MessageGuild below this, we don't want to have errors thrown if someone DMs the bot.
    if (!message.guild) return;

    let prefix;
    let prefixes = db.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
        prefix = '!'
        db.set(`prefix_${message.guild.id}`, "!");
    } else {
        prefix = prefixes;
    }

    let args = message.content.substring(prefix.length).split(" ");

    if (!fs.existsSync(`./Scores/${message.guild.id}.json`)) fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify({}), err => {
        if (err) {
            console.log(err);
            message.channel.send(err);
        }
    });

    bot.commands.get('Message Adder').execute(message);

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    switch (args[0]) {
        case 'ping':
            bot.commands.get('ping').execute(message);
            break;
        case 'clear':
            bot.commands.get('clear').execute(message, args);
            break;
        case 'say':
            bot.commands.get('say').execute(message, args, bot);
            break;
        case 'lb':
            bot.commands.get('leaderboard').execute(message);
            break;
        case 'ban':
            bot.commands.get('ban').execute(message, args, bot);
            break;
        case 'tempban':
            bot.commands.get('tempban').execute(message, args, bot);
            break;
        case 'kick':
            bot.commands.get('kick').execute(message, args, bot);
            break;
        case 'setprefix':
            bot.commands.get('setprefix').execute(message, args);
            break;
        case 'help':
        case 'h': {
            // I found this cool thing that I'll use here, it's a feature to have multiple conditions for a switch case, so your commands can have aliases like for help i'll do help and h
            bot.commands.get('help').execute(message, args, bot);
            break;
            // You need to just make a case right under the main one and put squiggly brackets around the code you want to execute, so now we can use !h and !help to use the help command.
        }
    }
})

bot.login(token)