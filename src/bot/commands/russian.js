import { command } from '../lib/utils/command.js'

async function resolver({
  channel,
  command: { bot },
  isBroadcaster,
  isModerator,
  isSubscriber,
  username: currentUser,
}) {
  if (isBroadcaster || isModerator || currentUser === 'v1dev') {
    return "I can't kill you my lord <3 ! mindse4Stop"
  }

  // As a russian roulette work, there is a chance on 6 to be killed
  // This chance is reduced on 3 if user is not a subscriber
  const shouldKill = Math.random() < 1 / (isSubscriber ? 6 : 3)

  if (shouldKill) {
    await bot.timeout(currentUser, { channels: [channel], duration: 1, reason: 'russian roulette game' })
    return `You loose ${currentUser}!!! I'll kill you !!!`
  } else {
    return `In my great kindness, I let you survive, ${currentUser} !!!`
  }
}

export default command('roulette', resolver, ['vladimir'])
