const { prefix, tipccId, devModeAccess } = require('../config.json');
const {niceDate, niceTime, getRoundTime} = require('../libs/decorator/timeDecorator')
// const {checkTipcc} = require('../libs/tipcc/tipcc');

module.exports = {
    name: 'messageCreate',
    async execute(message) {

        // const command = message.client.commands.get(message.commandName);
        try {
            if(message.author.bot && message.author.id != tipccId) return;

            // let gemEnded = false;
            // if(message.channel.id =="852763262281842708" && message.content == "63" && !gemEnded){
            //     gemEnded = true;
            //     message.channel.send(`Hey ${message.author} (${message.author.tag}) you own $.05 busd. pls wait for <@745688196440129915> to send.`)
            //     message.client.users.fetch('745688196440129915')
            //         .then(u => u.send(`${message.author.tag} won the game for $.05 busd`))
            // }

            if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return; //checkTipcc(message);; 
            // checkTipcc(message);

            const args = message.content.slice(prefix.length).trim().split(/ +|\n+/);
            const commandName = args.shift().toLowerCase();
            console.log(commandName);

            const command = message.client.commands.get(commandName);
                // message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command){
                return;
            //   checkTipcc(message);
            };

            if(command.devCmd && message.author.id != "745688196440129915") return;

            if(command.inDevMode && !devModeAccess.includes(message.author.id)) return;
            
            if (command.args && !args.length) {
                let reply = `You didn't provide any arguments, ${message.author}!`;
            
                if (command.usage) {
                  reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
                }
            
                return message.channel.send(reply);
              }
            
           
            await command.execute(message, args, commandName, message.client);
        } catch (error) {
            console.error(error);
            await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};