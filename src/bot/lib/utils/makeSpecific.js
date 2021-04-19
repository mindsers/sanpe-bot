export async function makeSpecific(channel, modifier) {
  return (...args) => (incommingMessage, messageContext) => {
    if (messageContext.channel === channel) {
      return messageContext
    }

    return modifier(...args)(incommingMessage, messageContext)
  }
}
