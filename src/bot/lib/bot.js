import tmi from 'tmi.js'

export class Bot {
  #client = null
  #channels = []
  #memory = {}

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

      let messageContext = {
        timeoutDuration: 300,
        banReason: `Because I can`,
      }

      for (const modifier of modifiers) {
        messageContext = await modifier({ channel, tags, text, self }, { ...messageContext, memory: this.getMemory() })

        this.setMemory(messageContext.memory)

        if (messageContext.message != null) {
          this.sendMessage(messageContext.message, { channels: [channel] })
          messageContext.message = null
        }

        if (messageContext.unban != null) {
          await this.unban(messageContext.unban, { channels: [channel] })
          messageContext.unban = null
        }

        if (messageContext.ban != null) {
          await this.ban(messageContext.ban, messageContext.banReason, { channels: [channel] })

          break
        }

        if (messageContext.timeout != null) {
          await this.timeout(messageContext.timeout, {
            reason: messageContext.reason,
            duration: messageContext.timeoutDuration,
            channels: [channel],
          })

          break
        }
      }

      console.debug(messageContext)
    })
  }

  sendMessage(message, { channels = this.#channels } = {}) {
    for (const channel of channels) {
      this.#client.say(channel, message)
    }
  }

  getMemory() {
    return { ...this.#memory }
  }

  setMemory(data = {}) {
    this.#memory = {
      ...this.#memory,
      ...data,
    }
  }

  resetMemory() {
    this.#memory = {}
  }

  async timeout(username, { channels = this.#channels, duration = 300, reason = 'Because I can' } = {}) {
    for (const channel of channels) {
      await this.#client.timeout(channel, username, duration, reason)
    }
  }

  async ban(username, reason, { channels = this.#channels } = {}) {
    for (const channel of channels) {
      await this.#client.ban(channel, username, reason)
    }
  }

  async unban(username, { channels = this.#channels } = {}) {
    for (const channel of channels) {
      await this.#client.unban(channel, username)
    }
  }

  connect() {
    this.#client.on('connected', (addr, port) => {
      console.log(`* Connected to ${addr}:${port}`)

      this.sendMessage("Hello there! I'm in da place!")
    })

    this.#client.connect()
  }
}
