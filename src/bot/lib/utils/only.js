export async function only(channel, modifier) {
  return (incommingMessage, messageContext) => {
    if (messageContext.channel === channel) {
      return messageContext
    }

    return modifier(incommingMessage, messageContext)
  }
}
