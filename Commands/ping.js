module.exports = {
    name: "ping",
    aliases: ["ping", "p"],
    description: "Pings the server",

    execute(message) {
        message.channel.send(':ping_pong: | Pinging...').then(pingMessage => {

            const start = message.createdTimestamp;
            const end = pingMessage.createdTimestamp;
            const subtraction = end - start;

            pingMessage.edit(`:ping_pong: | Pong! That took ${subtraction} ms.`);
        });
    }
}