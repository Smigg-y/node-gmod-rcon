const transfer = require('./transfer.js');
const { rcon_password, rcon_address } = require('./../config.json');

const rcon = require('srcds-rcon')({
    address: rcon_address,
    password: rcon_password
});

transfer.on('command_start', (channel) => {
    rcon.command('status').then(status => {
        transfer.emit('command_end', status, channel)
    }).catch(err => {
        transfer.emit('command_end', err, channel)
    });
});

module.exports = () => {
    rcon.connect().then(() => {
        console.log("rcon connected");
    }).catch(console.error);
}