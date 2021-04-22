export function sayHello() {
  const helloUserMemory = new Set()
  const hellos = ['hey', 'hi', 'hello', 'cc', 'yo', 'salut', 'bonjour', 'bijour', 'coucou', 'saloute']
  const botUsername = `@${process.env.BOT_USERNAME}`

  return ({ text }, { username }) => {
    const messageWords = text.toLowerCase().split(' ')
    const containsHello = messageWords.some(v => hellos.indexOf(v) !== -1)
    let mustAnswer = false

    if (containsHello) {
      if (messageWords.contains(botUsername)) {
        //Message is for the bot so it must respond
        mustAnswer = true
      } else if (messageWords.filter(w => w.startsWith('@')).length > 0) {
        // Message for someone else ?
        mustAnswer = false
      }

      if (mustAnswer && !helloUserMemory.has(username)) {
        helloUserMemory.add(username)
        return {
          ...messageContext,
          message: `Hello ${messageContext.displayName}!! Thank you for watching and welcome!`,
        }
      }
    }

    return { ...messageContext }
  }
}
