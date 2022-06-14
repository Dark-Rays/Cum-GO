module.exports = {
    name: "interactionCreate",
    once: false,
    execute(interaction) {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;
        const client = interaction.client;

        if(!client.commands.has(commandName)) return;
        
        try {
            const command = client.commands.get(commandName);
            command.execute(interaction)
        } catch (error) {
            console.log(error)
            interaction.reply({content: client.error, ephemeral: true})
        }
    }
}