export function sayHello() {
  return (incomingMessage, messageContext) => {
    const hellos = ['hey', 'hi', 'hello', 'yo', 'salut', 'bonjour', 'bijour', 'coucou', 'saloute']

    for (const hello of hellos) {
      if (incomingMessage.text.toLowerCase().split(' ').includes(hello)) {
        return {
          ...messageContext,
          message: `Hello ${incomingMessage.context['display-name']}!! Thank you for watching and welcome!`,
        }
      }
    }

    return { ...messageContext }
  }
}
