export function only(channel, modifier) {
  return (incomingMessage, messageContext) => {
    if (messageContext.channel === channel) {
      return messageContext
    }

    return modifier(incomingMessage, messageContext)
  }
}
