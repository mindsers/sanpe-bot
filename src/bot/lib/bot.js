import tmi from 'tmi.js'

import { chatEvents } from './utils/const.js'

export class Bot {
  #client = null
  #channels = []

  constructor(opts) {
    this.#channels = opts.channels
    this.#client = new tmi.client(opts)
  }

  messagePipe(...modifiers) {
    // We must consider using chat event instead of message event.
    // Message will also includes action messages and whisper messages.
    // https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md#chat
    this.#client.on(chatEvents.message, async (channel, tags, text, self, ...rest) => {
      console.debug({ channel, tags, text, self, rest })

      if (self) {
        return // Ignore messages from the bot
      }

      let messageContext = {
        timeoutDuration: 300,
        banReason: `Because I can`,
      }

      for (const modifier of modifiers) {
        messageContext = await modifier({ channel, tags, text, self }, messageContext)

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

  registerEvents(...events) {
    for (const { action, resolver = () => {} } of events) {
      this.addEventListener(action, resolver.bind(this))
    }
  }

  addEventListener(event, listener) {
    this.#client.on(event, listener)
  }

  sendMessage(message, { channels = this.#channels } = {}) {
    for (const channel of channels) {
      this.#client.say(channel, message)
    }
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
