const { SlashCommandBuilder, EmbedBuilder }= require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription(`Does what it says,Pings you`),
    async execute(interaction) {
        const sent = await interaction.reply({content: "Hold tight, Pinging...", fetchReply: true});
        const client = interaction.client;

        const embed = new MessageEmbed()
			.setAuthor(`${client.user.username}`, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`, `https://www.youtube.com`)
			.setColor('RANDOM')
			.setTitle('**__Ping Info__**')
			.setDescription(`:sparkling_heart: Bot heartbeat: ${client.ws.ping}ms \n:dart: Bot Ping: ${sent.createdTimestamp - interaction.createdTimestamp}ms`)
			.setFooter(`Requested by ${interaction.user.username}`, `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` )
			.setTimestamp();
        
        await interaction.editReply({content: "Pong:ping_pong:",embeds: [embed]})
    }
}