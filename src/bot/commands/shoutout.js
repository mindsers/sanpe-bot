import { command } from '../lib/utils/command.js'

function resolver(context) {
  const {
    command: {
      args: [username],
    },
    isModerator,
    isBroadcaster,
  } = context
  let {
    memory: { shoutout },
  } = context

  if (username != null) {
    if (isModerator !== true && isBroadcaster !== true) {
      return `Please STOP. You're not a moderator! mindse4Stop`
    } 

    shoutout = username.replace(`@`, ``)
  }

  if (shoutout == null) {
    return ``
  }

  return {
    ...context,
    memory: {
      shoutout,
    },
    message: `Follow @${shoutout} over at twitch.tv/${shoutout} ! <3 Kreygasm`,
  }
}

export default command('shoutout', resolver, ['so'])
