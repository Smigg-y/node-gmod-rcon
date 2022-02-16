# node-gmod-rcon
###### Sends a server status message to wherever the `st` command was called

## Example Output
![Exmample Image](https://i.imgur.com/gL3TdT1.png)

## Setup

```console
cd node-gmod-rcon
npm install
```

Add your information to [`config.json`](https://github.com/Smigg-y/node-gmod-rcon/blob/main/config.json)

```json
{
    "bot_token": "discord bot token",

    "rcon_address": "rcon ip:port (x.x.x.x:p)",
    "rcon_password": "rcon password"
}
```

## Usage
```console
npm start
```
