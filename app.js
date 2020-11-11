const Discord = require('discord.js');
const { join } = require('path');
const auth = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(client.user.tag + ":online");
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { 
        return;
    }
    
    if (receivedMessage.content.startsWith("q!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(2);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let argumentsCommand = splitCommand.slice(1);
    primaryCommand.toLowerCase();
    
    let command = client.commands.get(primaryCommand);

    try{
        command.execute(argumentsCommand,receivedMessage);
    }catch(err){
        let reply = command.error(err);
        receivedMessage.channel.send(reply);
        console.log(err);
    }
}
client.login(auth.token);
