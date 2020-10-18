const { parse } = require('path');
const { post } = require('request');
const { Submission } = require('snoowrap');

module.exports = {
    name: "sub",
    execute(arguments,recivedMessage){
        var snoowrap = require('snoowrap');
        let auth = require('../auth.json');
        const Discord = require('discord.js');
        const r = new snoowrap({
            userAgent : auth.userAgent,
            clientId : auth.clientR,
            clientSecret : auth.secretR,
            refreshToken : auth.refreshR
        })
        console.log(arguments)
        r.getHot(arguments[0], {limit: parseInt(arguments[1])}).then(myList =>{
            for(let i = myList.length- parseInt(arguments[1]);i < myList.length; ++i){
                let embed = new Discord.MessageEmbed();
                embed.setTitle(myList[i].title);
                embed.setURL("https://reddit.com" + myList[i].permalink)
                embed.setImage(myList[i].url);
                recivedMessage.channel.send(embed);
            }
        })
    }
}