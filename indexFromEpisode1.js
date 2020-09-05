const Discord = require('discord.js');
const bot = new Discord.Client();

const { prefix, token } = require('./Data/config.json');

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");
  
  // Uncomment below line if your bot REQUIRES GUILD DATA
  // if (!message.guild) return message.reply('DMs are not enabled');
  
  if (message.author.bot) return;
  // Add prefixless commands here (see second video)
  if (!message.content.startsWith(prefix)) return;
  
  switch(args[0]) {
    case 'ping':
      message.channel.send('Pong');
      break;
    
  }
});

bot.login(token);
