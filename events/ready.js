module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`The bot is online now!`);
    }
}