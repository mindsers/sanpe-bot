import { command } from '../lib/utils/command.js'

function resolver({ displayName }) {
  return `​Thanks for asking ${displayName}! To support @mindsers using Patreon go to https://www.patreon.com/mindsersit`
}

export default command('patreon', resolver)
