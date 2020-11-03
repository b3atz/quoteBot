const { parse } = require('path');
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
        //Specific Post:
        //Sends an emebd of a reddit post with a id that is supplied by the user
        //q!sub <id>
        if(arguments.length === 1){
            //this.getSpecific(arguments[0],r,recivedMessage);
        }
        //Hot Post:
        //Grabs the hot posts for the day from the sebreddit of users choice
        //q!sub hot <subname> <Limit to posts>
        if(arguments.length === 3 && parseInt(arguments[2])){
            if(arguments[0] === "hot"){
                this.getHot(r,arguments[1],arguments[2],recivedMessage);
            }else
        //Top Post:
        //Grabs the top posts for the day from the sebreddit of users choice
        //q!sub hot <subname> <Limit to posts>
            if(arguments[0] === "top"){
                this.getTop(r,arguments[1],arguments[2],recivedMessage);
            }else{
                throw("Invalid Args");
            }
        }
    },
    createPost(post){
        const Discord = require('discord.js');
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
    getTop(r,sub,limit,recivedMessage){
        r.getTop(sub, {limit: parseInt(limit)}).then(myList =>{
            for(let i = myList.length-parseInt(limit);i < myList.length; ++i){
                recivedMessage.channel.send(this.createPost(myList[i]));
            }
        })
    },
    getSpecific(arg,r,recivedMessage){
        const Discord = require('discord.js');
        let embed = new Discord.MessageEmbed();
        console.log(r.getSubmission(arg));
        embed.setColor('#fc4404');
        embed.setAuthor(r.getSubmission(arg).subreddit_name_prefixed,'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2',"https://reddit.com" + r.getSubmission(arg).permalink);
        embed.setDescription(r.getSubmission(arg).selftext);
        embed.setTitle(r.getSubmission(arg).title);
        embed.setURL();
        embed.setImage((r.getSubmission(arg).url.isFulfilled()) ? r.getSubmission(arg).url : null);
        embed.setFooter("u/" + r.getSubmission(arg).author.name + "  " + r.getSubmission(arg).score);
        recivedMessage.channel.send(embed);
    },
    error(err){

    }
}