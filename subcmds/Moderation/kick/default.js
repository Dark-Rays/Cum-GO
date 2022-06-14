module.exports = {
    name: 'default',
    mainCmd: 'kick',
    async execute(interaction) {
        const util = require('test')
        const client = interaction.client;
        const reason = interaction.options.getString('reason') || "No reason provided"
        const user = interaction.options.getString('member');
        console.log(user)
        // const member = await interaction.guild.members.fetch(user);
        console.log(util.test)

    }
}