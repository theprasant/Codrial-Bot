require('dotenv').config();

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
// client.slashCommands = new Collection();

const commandFolders = fs.readdirSync('./commands');


for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	// console.log(event.execute)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// For slash command

// const slashCommandFiles = fs.readdirSync('./commands_slash').filter(file => file.endsWith('.js'));

// for (const file of slashCommandFiles) {
// 	const slashCommand = require(`./commands_slash/${file}`);
// 	client.slashCommands.set(slashCommand.data.name, slashCommand);
// }


// client.once('ready', () => {
// 	console.log('Ready!');
// });

// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	const command = client.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}

// });


client.login(process.env.BOT_TOKEN);