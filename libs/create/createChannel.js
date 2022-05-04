const createChannel = (message, cname, user, perms, callback) => {

try{
    let finalPerms = perms?perms:["VIEW_CHANNEL", "SEND_MESSAGES"];
    message.guild.channels.create(cname, {
        type: "GUILD_TEXT",
        parent: '896269585081327646',
        permissionOverwrites: [{ //denying perms for everyone to see and send
            id: message.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
        }, { //allowing client(this bot) to see and send
            id: message.client.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS"]
        }, {  //allowing first user  to see and send
            id: message.author.id,
            allow: finalPerms
        }, {  //allowing second (mentioned) user  to see and send
            id: user.id,
            allow: finalPerms
        }]
    })
    .then((c) => {
        callback(c);
    })
}catch(err) {
    console.error(err);
    message.channels.send(`\`\`\`xl\n${err.message}\n\`\`\``)
}

};

module.exports = {createChannel}