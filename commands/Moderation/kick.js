const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('kick')
            .setDescription('Kick one or multiple users from the server/network')
            
            //Default (Mutli or Single) kick mode
            .addSubcommand( cmd => {
                cmd.setName('default')
                    .setDescription('Kicks one or more members from the server.')
                    .addStringOption( option => {
                        option.setName('member')
                               .setDescription("Either mention or input the user id of the members to kick")
                               .setRequired(true)
                               return option;
                    })
                    .addStringOption( option => {
                        option.setName('reason')
                              .setDescription(`Reason to kick the member/'s`)
                              .setRequired(true) //Will change to server based settings
                              return option;
                    })
                    return cmd;
            })
            //Network Kick mode
            .addSubcommand( cmd => {
                cmd.setName('network')
                    .setDescription("kicks one or more (max:5) user from the network server")
                    .addStringOption( option => {
                        option.setName('member')
                              .setDescription("Either mention or input the user id of the members to kick from the network")
                              .setRequired(true)
                              return option;
                    })
                    .addStringOption( option => {
                        option.setName('reason')
                        .setDescription(`Reason to kick the user/'s`)
                        .setRequired(true)
                        return option;
                    })
                    return cmd;
            }),
    async execute(interaction) {
        const mode = interaction.options.getSubcommand();
        const client = interaction.client;

        if(!client.subcmds.has(mode)) return;
        const subCommand = client.subcmds.get(mode);
        if(subCommand.mainCmd !== interaction.commandName) return;
        subCommand.execute(interaction)
    }
}