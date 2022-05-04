require('dotenv').config();
// const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');

const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands_slash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands_slash/${file}`);
    commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.', guildId);

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
