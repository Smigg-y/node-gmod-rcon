const { Client, Intents, MessageEmbed, Message } = require('discord.js');
const { bot_token } = require('./../config.json');
const transfer = require('./transfer.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith('st')) {
        if (message.author.bot) return;
        transfer.emit('command_start', message.channelId);
    }
});

transfer.on('command_end', (command, channelId) => {
    const channel = client.channels.cache.get(channelId);   
    
    let svArr = new String(command).split('\n');
    let hostname = new String(svArr[0]).replace('hostname: ', '');
    let version = new String(svArr[1]).replace('version : ', '');    
    let ip = new String(svArr[2]).replace('udp/ip  : ', '');
    let map = new String(svArr[3]).replace('map     : ', '').split(' ')[0];
    let plyAmount = new String(svArr[4]).replace('players : ', '');
    let players = [];

    for (let index = 7; index < svArr.length - 1; index++) {
        let baseArr = svArr[index].replace(/[#"]/g, '').split(' ');
        let plyArr = baseArr.filter((item) => item != '');

        // name, uniqueid, ping
        players[index - 7] = [plyArr[1], plyArr[2], plyArr[4]];
    }

    let mStart = `${'```diff'}\n` ;

    let mContent = `+ hostname: ${hostname}\n+ version: ${version}\n+ udp/ip: ${ip}\n+ map: ${map}\n+ players: ${plyAmount}\n\n`;
    mContent += `- name(uniqueid)    ping\n`
    mContent += `+ ======================\n`

    for (let index = 0; index < players.length; index++) {
        let v = players[index];
        mContent += `| ${v[0]}(${v[1]})  ${v[2]}\n`
    }

    let mEnd = `\n${'```'}`;

    channel.send(mStart + mContent + mEnd);
});

client.on('error', () => {});

module.exports = () => new Promise((resolve) => {
    client.on('ready', () => {
        console.log(`discord bot connected`);
        resolve();
    });

	client.login(bot_token);
});
