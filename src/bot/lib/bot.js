import tmi from 'tmi.js'

export class Bot {
  #client = null
  #channels = []
  #username = ''
  #memory = {}

  constructor(opts) {
    this.#channels = opts.channels
    this.#username = opts.identity.username
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
        bot: this.#username,
      }

      for (const modifier of modifiers) {
        const { message, unban, ban, timeout, fulfilled = true, memory, ...opts } = {
          ...messageContext,
          ...((await modifier({ channel, tags, text, self }, { ...messageContext, memory: this.getMemory() })) || {}),
        }

        if (memory != null) {
          this.setMemory(memory)
        }

        if (memory === null) {
          this.resetMemory()
        }

        if (message != null) {
          this.sendMessage(message, { channels: [channel] })
        }

        if (unban != null) {
          await this.unban(unban, { channels: [channel] })
        }

        if (ban != null) {
          await this.ban(ban, opts.banReason, { channels: [channel] })
        }

        if (timeout != null) {
          await this.timeout(timeout, {
            reason: opts.reason,
            duration: opts.timeoutDuration,
            channels: [channel],
          })
        }

        if (fulfilled === true) {
          break
        }

        messageContext = opts
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

      this.sendMessage(`Hello there! I'm in da place!`)
    })

    this.#client.connect()
  }
}
