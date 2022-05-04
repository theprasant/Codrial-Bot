const { createChannel } = require('../../libs/create/createChannel')
module.exports = {
    name: 'channel',
    description: 'Create channel!',
    // myChannelPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
    // cooldown: 35,
    // args: false,
    async execute(message, args) {

        try {
            let cname = `anything${Math.random().toFixed(3)}`;
            let perms = ["VIEW_CHANNEL", "SEND_MESSAGES"];
            let secondUser = message.mentions.users.first();

            if (!secondUser) return message.reply(`Sorry, you have to mention a user to create a channel.`)
            createChannel(message, cname, secondUser, perms, async (c) => {

                await message.channel.send(`Created channel ${c} with permissions ${perms} for users ${message.author} and ${message.mentions.users.first()}`)
            });
        } catch (err) {
            console.error(err);
            message.channels.send(`\`\`\`xl\n${err.message}\n\`\`\``)
        }

    },
};




















/*
        message.guild.channels.create(cname, {
            type: "GUILD_TEXT",
            parent: '806407503134195733',
            permissionOverwrites: [{
                id: message.guild.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            }, {
                id: message.client.user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            }]
        });
*/