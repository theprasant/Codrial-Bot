module.exports = {
    name: 'rick',
    description: 'rickroll user!',
    myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],
    // cooldown: 35,
    args: false,
    execute(message) {
      message.channel.send(`Sorry ${message.mentions.users.first()}, you are rickrolled 😂🤣 \n https://c.tenor.com/yheo1GGu3FwAAAAM/rick-roll-rick-ashley.gif`);
    },
  };