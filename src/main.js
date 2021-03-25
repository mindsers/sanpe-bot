import tmi from 'tmi.js'

const opts = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN,
    },
    channels: [ 
        'Mindsers'
    ]
}

const client = new tmi.client(opts)

client.on('message', async (target, context, msg, self) => {
    if (self) {
        return // Ignore messages from the bot
    }

    if (!msg.startsWith('!')) {
        return // Ignore if not a command
    }

    const [commandName] = msg.trim().split(' ')

    try {
        const { resolver } = await import(`./commands/${commandName.replace('!', '')}.js`)
        if (resolver != null) {
            resolver({ client, target, context, msg, self })
            return 
        }
    } catch (e) {
        console.log(`* Unknown command ${commandName}`)
    }
})

client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`)
})

client.connect()
