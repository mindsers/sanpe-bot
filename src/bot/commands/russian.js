const youths = ['padawan', 'noob', 'jedi', 'trekkie', 'elf']

const banTime = 1000
const banReason = 'russian roulette game'

export async function resolver({
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
  const shouldKill = Math.random() < 1 / isSubscriber ? 6 : 3
  const youth = youths[Math.floor(Math.random() * youths.length)]

  if (shouldKill) {
    await bot.ban(channel, currentUser, banReason)
    setTimeout(async () => {
      await bot.unBan(channel, currentUser)
    }, banTime)
    return `You loose ${currentUser}!!! I'll kill you young ${youth}`
  } else {
    return `In my great kindness, I let the young ${youth} ${currentUser} survive !!!`
  }
}
