import tmi from 'tmi.js'

export class Bot {
  #client = null
  #channels = []

  constructor(opts) {
    this.#channels = opts.channels
    this.#client = new tmi.client(opts)
  }

  messagePipe(...modifiers) {
    this.#client.on('message', async (channel, tags, text, self, ...rest) => {
      console.debug({ channel, tags, text, self, rest })
      if (self) {
        return // Ignore messages from the bot
      }

      let messageContext = {}
      for (const modifier of modifiers) {
        messageContext = await modifier({ channel, tags, text, self, bot: this }, messageContext)
      }

      console.debug(messageContext)

      if (messageContext.message != null) {
        this.sendMessage(messageContext.message, [channel])
      }
    })
  }

  sendMessage(message, channels = this.#channels) {
    for (const channel of channels) {
      this.#client.say(channel, message)
    }
  }

  async timeout(channel, username, reason, duration = 300) {
    await this.#client.timeout(channel, username, duration, reason)
  }

  async ban(channel, username, reason) {
    await this.#client.ban(channel, username, reason)
  }

  async unBan(channel, username) {
    await this.#client.unban(channel, username)
  }

  connect() {
    this.#client.on('connected', (addr, port) => {
      console.log(`* Connected to ${addr}:${port}`)

      this.sendMessage(`​Hello there! I'm in da place!`)
    })

    this.#client.connect()
  }
}
