// const {btnEvent} = require('../libs/buttonEvent/button')
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

        // if (interaction.isButton());
        //  return btnEvent();
        if (!interaction.isCommand()) return;

        const command = interaction.client.slashCommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};