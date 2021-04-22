export function sayHello() {
  const helloUserMemory = new Set()
  const hellos = ['hey', 'hi', 'hello', 'cc', 'yo', 'salut', 'bonjour', 'bijour', 'coucou', 'saloute']

  return ({ text }, messageContext) => {
    const { username } = messageContext
    const messageWords = text.toLowerCase().split(' ')

    if (!messageWords.some(v => hellos.includes(v))) {
      return { ...messageContext }
    }

    const mentionSomeone = messageWords.filter(w => w.startsWith('@')).length > 0
    const mentionSanpe = mentionSomeone && messageWords.includes(`@${process.env.BOT_USERNAME.toLowerCase()}`)

    if (mentionSomeone && !mentionSanpe) {
      // mention
      return { ...messageContext }
    }

    if (helloUserMemory.has(username) && !mentionSanpe) {
      return { ...messageContext }
    }

    helloUserMemory.add(username)
    return {
      ...messageContext,
      message: `Hello @${messageContext.displayName}!! Thank you for watching and welcome!`,
    }
  }
}
