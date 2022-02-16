const startDiscord = require('./discord.js');
const startRcon = require('./rcon.js');

module.exports = async () => {
    await startDiscord();
    startRcon();
    console.log("listening for commands...");
};