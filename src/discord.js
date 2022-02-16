const { Client, Intents } = require('discord.js');
const { bot_token } = require('./../config.json');
const transfer = require('./transfer.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith('st')) {
        transfer.emit('command_start', message.channelId);
    }
});

transfer.on('command_end', (command, channelId) => {
    const channel = client.channels.cache.get(channelId);   
    channel.send(command);
});

client.on('error', () => {});

module.exports = () => new Promise((resolve) => {
    client.on('ready', () => {
        console.log(`discord bot connected`);
        resolve();
    });

    client.login(bot_token);
});
