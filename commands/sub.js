module.exports = {
    name: "sub",
    execute(aruments){
        var snoowrap = require('snoowrap');
        let auth = require('../auth.json');
        const r = new snoowrap({
            userAgent : auth.userAgent,
            clientId : auth.clientR,
            clientSecret : auth.secretR,
            refreshToken : auth.refreshR
        })
        r.getHot('characterdrawing', {limit: 1}).then(console.log)
    }
}