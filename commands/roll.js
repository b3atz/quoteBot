module.exports = {
    name: "roll",
    execute(argument){
        let current = 0;
        let total = 0;
        let reply = "Roll: ";
        let sub = 0;
        for(let i = 0;i < argument.length;++i){
            if(isNaN(argument[current])){
                //Checks if there is a minus sign
                if(argument[current] === "-"){
                    reply += argument[current] + " ";
                    sub = 1;
                } else if(argument[current] === "+"){
                    reply += argument[current] + " ";
                }else{
                    let tempRoll = argument[current].split("d");
                    let tempTotal = 0;
                    if(tempRoll.length === 2){  
                        reply += "|";
                        if(tempRoll[0] > 100 || tempRoll[1] > 100){
                            throw("Invalid Range");
                        }
                        for(let i = 0; i < tempRoll[0] - 1; ++i){
                            let j = Math.floor((Math.random() * tempRoll[1]) + 1);
                            reply += j + ",";
                            tempTotal += j;
                        }
                        let j = Math.floor((Math.random() * tempRoll[1]) + 1);
                        reply +=  + j + "| ";
                        tempTotal += j;
                        if(sub === 0){
                            total += tempTotal;
                        } else{
                            total -= tempTotal;
                            sub = 0;
                        }
                    }else{
                        throw("Invalid Split");
                    }
                }
            }else{
                //This is a number
                //Add arg to end of list
                j = parseInt(argument[current],10);
                reply += j + " ";
                if(sub === 0){
                    total += j;
                } else{
                    total -= j;
                    sub = 0;
                }
            }
            ++current;
        }
        reply += "= " + total;
        return reply;
    }
}