const checkTipcc = (message) => {
    if(message.author.id != '617037497574359050') return;

    let msgContentArr = message.content.split(' ');

    if(msgContentArr[2] != 'sent') return;

    let tokenEmojiId = /\d+/.exec(msgContentArr[0]);
    let sentUserId = /\d+/.exec(msgContentArr[1]);
    let receivedUserId = /\d+/.exec(msgContentArr[3]);
    let transAmountExec = /(\d+)\.?(\d+)?/.exec(msgContentArr[4])[0];
    let transAmountRep = msgContentArr[4].replace(/\*/g,'');

    let tokenArray = msgContentArr[5].split('');
        if(tokenArray[tokenArray.length - 1] == '*') tokenArray.pop();
        if(tokenArray[tokenArray.length - 1] == '*') tokenArray.pop();
    let token = tokenArray.join('');

    let priceArr = msgContentArr[msgContentArr.length - 1].split('');
        priceCurrency = priceArr.shift();
        if(priceArr[priceArr.length - 1] == '.') priceArr.pop();
        if(priceArr[priceArr.length - 1] == ')') priceArr.pop();
    let transPriceShiftPop = priceArr.join('');

    let priceExec = /(\d+)\.?(\d+)?/.exec(msgContentArr[msgContentArr.length - 1])[0];

    let txt = `
    sent by: <@${sentUserId}> - ${sentUserId}
    sent to: <@${receivedUserId}> - ${receivedUserId}
    emoji id: ${msgContentArr[0]} - ${tokenEmojiId}
    amount by exec: ${transAmountExec}
    amount by replace : ${transAmountRep}
    token: ${token}
    currency: ${priceCurrency}
    price by shift and pop: ${transPriceShiftPop}
    price by exec: ${priceExec}
    `
    console.log(msgContentArr)

    message.channel.send(txt)
    return;
    console.log(msgContentArr)
    message.channel.send(`${msgContentArr[1]} sent ${msgContentArr[3]} ${msgContentArr[4]} ${msgContentArr[5]} worth ${msgContentArr[7]}\n> coin image: https://cdn.discordapp.com/emojis/${msgContentArr[0].replace(/\D/g, '')}.png?size=56`);

}

module.exports = {checkTipcc};