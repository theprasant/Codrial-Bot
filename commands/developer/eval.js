const { prefix, devId } = require('../../config.json');
const fetch = require('node-fetch');

// const fetch = require('node-fetch');

let testUrl = 'https://media.discordapp.net/attachments/857125679169404938/873160492070355024/plan.txt';

module.exports = {
  name: 'eval',
  aliases: ['e', 'ev'],
  devCmd: true,
  description: 'eval, this is developer command',
  userPerms : ['VIEW_CHANNEL', 'SEND_MESSAGES'],
    myPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
    args: true,
    usage: '<code>',

  async execute(message, args, command, client) {
    try {
//Checking permissions
    if (message.author.id !== devId && args[0] != 'message.guild.currentGames') {
      return message.channel.send('This command is only for developer.');
    }

    // if(!message.channel.type === 'dm' && !message.member.hasPermission(this.userPerms)){
    //   return message.channel.send(`Sorry, you need \`${this.userPerms.filter(p => !message.member.hasPermission(p)).join("`, `")}\` permission(s) to use this command`)
    // }
    // if(!message.channel.type === 'dm' && !message.guild.me.hasPermission(this.myPerms)){
    //   return message.channel.send(`Sorry, I don't have \`${this.myPerms.filter(p => !message.guild.me.hasPermission(p)).join("`, `")}\` permission(s)`)
    // }
    

    //main code
     let code = message.content.substr(prefix.length).trimStart().substr(command.length);


    if (typeof code == 'undefined') {
      return message.channel.send('Dont send string');
    }
    if (code === '') {
     return message.channel.send('Please write something to evaluate.');
    }

    
    // console.log(`code: ${code} , prefix: ${prefix}, command: ${command}`);

    // return;
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      let msgLimit = 1500;

      if (evaled.length > msgLimit) {
        let arrNo = (evaled.length - (evaled.length % msgLimit)) / msgLimit;
       message.channel.send(`${evaled.length} : ${arrNo + Number(arrNo * msgLimit !== evaled.length)}`);

        
        message.channel.send(clean(evaled), { split: { maxLength: 1500}, code: "javascript" })

      }
            await message.channel.send(clean(evaled), { code: "javascript" });

    } catch (err) {
      console.error(err);
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

  },
};

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}