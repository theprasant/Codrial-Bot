module.exports = {
    name: 'ping',
    description: 'Ping!',
    myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],
    // cooldown: 35,
    args: false,
    execute(message) {
      message.channel.send('Pong. 🎉');
    },
  };