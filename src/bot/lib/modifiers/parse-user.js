export function parseUser() {
  return (incomingMessage, messageContext) => ({
    username: incomingMessage.tags?.username,
    displayName: incomingMessage.tags && incomingMessage.tags['display-name'],
    isModerator: incomingMessage.tags?.mod,
    isSubscriber: incomingMessage.tags?.subscriber,
    isBroadcaster: messageContext.broadcaster === incomingMessage.tags?.username,
    fulfilled: false,
  })
}
