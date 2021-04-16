export function resolver({ username: currentUser, command: { args, name }, isSubscriber }) {
  const [mention] = args

  if (mention == null) {
    return `Love who?! Love what!? Bananas? NotLikeThis mindse4Stop`
  }

  const username = mention.replace('@', '').toLowerCase()

  if (username === currentUser) {
    return `100% because you should love yourself! <3`
  }

  let rate = Math.round(Math.random() * 100)
  if (isSubscriber) {
    rate = Math.round((Math.random() + 0.5) * 100)

    if (rate > 100) {
      rate = 100
    }
  }

  return `There's ${rate}% <3 between @${currentUser} and @${username}!`
}
