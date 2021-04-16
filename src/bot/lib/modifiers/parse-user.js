export function parseUser() {
    return (incomingMessage, messageContext) => ({
        ...messageContext,
        username: incomingMessage.tags['username'],
        displayName: incomingMessage.tags['display-name'],
        isModerator: incomingMessage.tags['mod'],
        isSubscriber: incomingMessage.tags['subscriber'],
        isBroadcaster: messageContext.broadcaster === incomingMessage.tags['username'],
    })
}