const Discord = require('discord.js');
const auth = require('./auth.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(client.user.tag + ":online");
})

client.login(auth.token);