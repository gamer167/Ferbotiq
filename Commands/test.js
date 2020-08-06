module.exports = {
    name: "test",
    aliases: ["test", "t"],
    description: "Does a simple test",

    execute(message) {
        message.reply('Test complete!');
    }
}