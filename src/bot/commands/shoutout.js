function resolver({ command: { args, memory }, isModerator, isBroadcaster }) {
  const [username] = args

  if (username != null) {
    if (isModerator !== true && isBroadcaster !== true) {
      return `Please STOP. You're not a moderator! mindse4Stop`
    } else {
      memory.shoutout = username
    }
  }

  if (memory.shoutout == null) {
    return ``
  }

  return `Follow @${memory.shoutout} over at twitch.tv/${memory.shoutout} ! <3 Kreygasm`
}

export default command('shoutout', resolver, ['so'])
