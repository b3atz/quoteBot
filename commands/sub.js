const { parse } = require('path');
const Discord = require('discord.js');
const { post } = require('request');
const { Submission } = require('snoowrap');

module.exports = {
    name: "sub",
    //When command is called
    execute(arguments,recivedMessage){
        var snoowrap = require('snoowrap');
        let auth = require('../auth.json');
        const r = new snoowrap({
            userAgent : auth.userAgent,
            clientId : auth.clientR,
            clientSecret : auth.secretR,
            refreshToken : auth.refreshR
        })
        if(parseInt(arguments[2]) > 10 || parseInt(arguments[2]) < 0){
            throw("Invalid Args");
        }
        //Hot Post:
        //Grabs the hot posts for the day from the sebreddit of users choice
        //q!sub hot <subname> <Limit to posts>
        if( (arguments.length === 3 || arguments.length === 4) && parseInt(arguments[2])){
            if(arguments[0] === "hot"){
                this.getHot(r,arguments[1],arguments[2],recivedMessage);
            }else
        //Top Post:
        //Grabs the top posts for the day from the sebreddit of users choice
        //q!sub hot <subname> <Limit to posts>
            if(arguments[0] === "top"){
                this.getTop(r,arguments[1],arguments[2],arguments[3],recivedMessage);
            }else{
                throw("Invalid Args");
            }
        }
    },
    createPost(post){
        //Creates an embeded post then returns it
        let embed = new Discord.MessageEmbed();
        embed.setColor('#fc4404');
        embed.setAuthor(post.subreddit_name_prefixed,'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2',"https://reddit.com" + post.permalink);
        embed.setDescription(post.selftext);
        embed.setTitle(post.title);
        embed.setURL();
        embed.setImage(post.url);
        embed.setFooter("u/" + post.author.name + "  " + post.score);
        return embed;
    },
    getHot(r,sub,limit,recivedMessage){
        r.getHot(sub, {limit: parseInt(limit)}).then(myList =>{
            for(let i = myList.length- parseInt(limit);i < myList.length; ++i){
                recivedMessage.channel.send(this.createPost(myList[i]));
            }
        })
    },
    getTop(r,sub,limit,time,recivedMessage){
        r.getTop(sub,{limit: parseInt(limit),time: time}).then(myList =>{
            for(let i = myList.length-parseInt(limit);i < myList.length; ++i){
                recivedMessage.channel.send(this.createPost(myList[i]));
            }
        })
    },
    error(err){
        let embed = new Discord.MessageEmbed();
        embed.setColor('#d23929');
        embed.setTitle("Sub");
        embed.setDescription("Error: " + err 
            + "\n Function: q!sub <mode> <sub> <limit> <time>"
            + "\n\n```<mode>:\n  Hot -Gets hot posts for the day\n  Top -Gets top posts"
            + "\n\n<sub>: Name of the Subreddit"
            + "\n\n<limit>: Limit of the number of posts"
            + "\n\n<time>: *only use in top mode*```");
            return embed;
    }
}