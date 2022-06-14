const { Client, Intents }= require('discord.js');
const fs = require(`node:fs`);
require('dotenv').config();
const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES] });
client.error = require('./config').ErrorMsg;

require('./Struct/Utils/Util')

fs.readdirSync(`./Handlers`).forEach( handler => require(`./Handlers/${handler}`)(client) );


client.login(process.env.TOKEN);