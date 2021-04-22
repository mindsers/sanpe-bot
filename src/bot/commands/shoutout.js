import { command } from '../lib/utils/command.js'

function resolver({ command: { args }, isModerator, isBroadcaster, getMemory, setMemory }) {
  const [username] = args
  const { shoutout } = getMemory()

  if (username != null) {
    if (isModerator !== true && isBroadcaster !== true) {
      return `Please STOP. You're not a moderator! mindse4Stop`
    } else {
      setMemory({ shoutout: username })
    }
  }

  if (shoutout == null) {
    return ``
  }

  return `Follow @${shoutout} over at twitch.tv/${shoutout} ! <3 Kreygasm`
}

export default command('shoutout', resolver, ['so'])
