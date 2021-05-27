export function sayHello() {
  const hellos = [
    /^h+e+y+$/,
    /^h+i+$/,
    /^h+e+l+o+$/,
    /^c+c+$/,
    /^y+o+$/,
    /^s+a+l+u+t+$/,
    /^b+o+n+j+o+u+r$/,
    /^b+i+j+o+u+r$/,
    /^c+o+u+c+o+u$/,
    /^s+a+l+o+u+t+e+$/,
    /^r+e+$/,
    /^b+o+n+s+o+i+r+$/,
  ]

  return ({ text }, messageContext) => {
    const {
      username,
      memory: { helloedUsers = new Set() },
      displayName,
      bot,
    } = messageContext
    const messageWords = text.toLowerCase().split(' ')

    if (!messageWords.some(v => hellos.some(h => h.test(v)))) {
      return { fulfilled: false }
    }

    const mentionSomeone = messageWords.filter(w => w.startsWith('@')).length > 0
    const mentionSanpe = mentionSomeone && messageWords.includes(`@${bot.toLowerCase()}`)

    if (mentionSomeone && !mentionSanpe) {
      return { fulfilled: false }
    }

    if (helloedUsers.has(username) && !mentionSanpe) {
      return { fulfilled: false }
    }

    helloedUsers.add(username)
    return {
      ...messageContext,
      message: `Hello @${displayName}!! Thank you for watching and welcome!`,
      memory: { helloedUsers },
    }
  }
}
