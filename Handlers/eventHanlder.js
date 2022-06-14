const fs = require('node:fs');

module.exports = (client) => {
    const EventFiles = fs.readdirSync(`./events`).filter(file => file.endsWith(`.js`));

    EventFiles.forEach( file => {
        const event = require(`../events/${file}`);

        if(event.once) 
            client.once(event.name, (...args) => event.execute(...args) )
        else
            client.on(event.name, (...args) => event.execute(...args))
    })
}