const fetch = require('node-fetch');
module.exports = {
  name: 'ae',
  aliases: ['addemoji', 'emoadd', 'emocreate'],
  description: 'adds an emoji to server.',
  guildOnly: true,
  args: true,
  myPerms: ['MANAGE_EMOJIS'],
  userPerms: ['MANAGE_EMOJIS'],
  myChannelPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
  usage: '<emoji_name> <emoji_link>',
  //permissions: 'KICK_MEMBERS',

  execute(message, args, command, client) {
    try {
      /*
      try {
       const fetch = require('node-fetch');
fetch(args[1], {method: 'HEAD'})
.then(response => message.channel.send(response.headers.get('content-length')))
      } catch (error) {
        
      }
      */
      if (!message.member.hasPermission(this.userPerms)) {
        return message.channel.send(`Sorry, you need \`${this.userPerms.filter(p => !message.member.hasPermission(p)).join("`, `")}\` permission(s) to use this command`)
      }
      if (!message.guild.me.hasPermission(this.myPerms)) {
        return message.channel.send(`Sorry, I don't have \`${this.myPerms.filter(p => !message.guild.me.hasPermission(p)).join("`, `")}\` permission(s)`)
      }
      if (!args.length) return message.channel.send(`You need to provide at least 1 arguments. 
  > First one is the name of the emoji
  > Second one is the link of the image to be added in emoji [optional if you are attaching an image] 
  **\`Emoji size should be less than 256 kb\`**`)

      if (args[0].length < 2) {
        return message.channel.send(`Image name should be atleast 2 characters long.`)
      }

      if (args[0].match(/\W/ig)) {
        return message.channel.send(`Emoji name must **\`NOT\`** contain any special character. Remove the character(s) \`${args[0].match(/\W/ig).join('`, `')}\` from the emoji name (first argument)
    > **Note:** Emoji names can contain \`letters\`,\`Numbers\`,\`underscore (_)\``)
      }

      let imgUrl;
      if(message.attachments.size){
        imgUrl = message.attachments.map(a => a.attachment)[0];
        
      }else if(args.length < 2){
        return message.channel.send(`Sorry ! You need to attach an image or provide an image url.`)
      }else{
        imgUrl = args[1];
      }
      fetch(imgUrl, { method: 'HEAD' })
        .then(response => response.headers)
        .then(h => {
          if (!h.get('content-type').includes('image')) {
            return message.channel.send(`Sorry Provided link is not a valid image... Try using an image link instead.`)
          }
          if (h.get('content-length') > 256 * 1024) {
            return message.channel.send(`Sorry image size must be less than 256 kb. Provided images size is ${(h.get('content-length') / 1024).toFixed(2)} kb. Try compressing it or use another image link .`)
          }
        })
        .catch(e => {
          return message.channel.send(`${e.message}\n\n> You need to provide at least 1 arguments. 
          > First one is the name of the emoji
          > Second one is the link of the image to be added in emoji [ Optional if you are attaching an image] 
          **\`Emoji size should be less than 256 kb\`**`)
        })


      message.guild.emojis.create(imgUrl, args[0]).then(e => message.channel.send(`Added emoji <${e.animated ? 'a' : ''}:${e.name}:${e.id}> with name \`${e.name}\` by ${message.author.tag}`)).catch(e => console.error(e)).catch(err => {
        console.error(err);
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err.message)}\n\`\`\``)
      })

    } catch (err) {
      console.error(err);
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err.message)}\n\`\`\``)
    }
  },
};

const clean = text => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

/*
const hasPerms = (u, cmd) => {
  if(!message.member.hasPermission(this.userPerms)){
      return message.channel.send(`Sorry, you need \`${this.userPerms.filter(p => !message.member.hasPermission(p)).join("`, `")}\` permission(s) to use this command`)
  }
  if(!message.guild.me.hasPermission(this.myPerms)){
      return message.channel.send(`Sorry, I don't have \`${this.myPerms.filter(p => !message.guild.me.hasPermission(p)).join("`, `")}\` permission(s)`)
  }
}
*/


/*
if (command.permissions) {
  const authorPerms = message.channel.permissionsFor(message.author);
  if (!authorPerms || !authorPerms.has(command.permissions)) {
    return message.reply(`You don't have enough permissions`);
  }
}
*/