export function parseChannel() {
  return incomingMessage => ({
    channel: incomingMessage.channel,
    broadcaster: incomingMessage.channel.replace('#', ''),
    fullfilled: false,
  })
}
