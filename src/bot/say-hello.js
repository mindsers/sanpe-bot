export function sayHello() {
  const hellos = ['hey', 'hi', 'hello', 'cc', 'yo', 'salut', 'bonjour', 'bijour', 'coucou', 'saloute', 're', 'bonsoir']

  return ({ text }, messageContext) => {
    const { username, getMemory, setMemory } = messageContext
    const { helloedUsers = new Set() } = getMemory()
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

    if (helloedUsers.has(username) && !mentionSanpe) {
      return { ...messageContext }
    }

    helloedUsers.add(username)
    setMemory({ helloedUsers })
    return {
      ...messageContext,
      message: `Hello @${messageContext.displayName}!! Thank you for watching and welcome!`,
    }
  }
}
