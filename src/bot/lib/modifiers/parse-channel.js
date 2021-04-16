export function parseChannel() {
    return (incomingMessage, messageContext) => ({
        ...messageContext,
        channel: incomingMessage.channel,
        broadcaster: incomingMessage.channel.replace('#', ''),
    })
}