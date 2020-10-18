const Discord = require('discord.js');
const { join } = require('path');
const auth = require('./auth.json');
const client = new Discord.Client();
const roll = require('./commands/roll.js');
const sub = require('./commands/sub.js')

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

    if(primaryCommand === "Roll" || primaryCommand === "roll" ){
        try{
            //Roll will take and *multipler*d*dice* number and add them to a number or another dice roll
            if(argumentsCommand.length){
                ;
            }else{
                throw(argumentsCommand.length);
            }
            let reply = roll.execute(argumentsCommand);
            receivedMessage.channel.send(reply);

        }
        catch(err){
            //roll.errorRoll(err);
            errorFucntion(err);
        }
    }
    if(primaryCommand === "Sub" || primaryCommand === "sub" ){
        try{
            //Roll will take and *multipler*d*dice* number and add them to a number or another dice sub
            if(argumentsCommand.length){
                ;
            }else{
                throw(argumentsCommand.length);
            }
            let reply = sub.execute(argumentsCommand,receivedMessage);
        }
        catch(err){
            //sub.errorRoll(err);
            errorFucntion(err);
        }
    }

}

function errorFucntion(error){
    console.log(error);
}
client.login(auth.token);