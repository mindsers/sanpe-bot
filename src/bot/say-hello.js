export function sayHello() {
  const helloUserMemory = new Set()
  const hellos = ['hey', 'hi', 'hello', 'cc', 'yo', 'salut', 'bonjour', 'bijour', 'coucou', 'saloute', 're', 'bonsoir']

  return ({ text }, messageContext) => {
    const { username } = messageContext
    const messageWords = text.toLowerCase().split(' ')

    if (!messageWords.some(v => hellos.includes(v))) {
      return { fulfilled: false }
    }

    const mentionSomeone = messageWords.filter(w => w.startsWith('@')).length > 0
    const mentionSanpe = mentionSomeone && messageWords.includes(`@${process.env.BOT_USERNAME.toLowerCase()}`)

    if (mentionSomeone && !mentionSanpe) {
      return { fulfilled: false }
    }

    if (helloUserMemory.has(username) && !mentionSanpe) {
      return { fulfilled: false }
    }

    helloUserMemory.add(username)
    return {
      message: `Hello @${messageContext.displayName}!! Thank you for watching and welcome!`,
    }
  }
}
