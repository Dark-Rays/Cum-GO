const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const config = require('../config');

module.exports = (client) => {
    function getFiles (dir, files_){
        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        for (var i in files){
            var name = path.join(dir, files[i] );
            if (fs.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }
    
    const commandFiles = getFiles(`./commands`);
    const subCmdFiles = getFiles(`./subcmds`);
    client.commands = new Collection();
    client.subcmds = new Collection();
    const commands = [];
    
    commandFiles.forEach( file => {
        let command = require(`../${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    })

    subCmdFiles.forEach( file => {
        const subcmd = require(`../${file}`);
        client.subcmds.set(subcmd.name, subcmd)
    })
    
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
    
            if(config.TestMode) {
                await rest.put(
                    Routes.applicationGuildCommands(config.ClientID, config.GuildID),
                    { body: commands },
                );
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(config.ClientID),
                    { body: commands },
                );
            }
    
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}