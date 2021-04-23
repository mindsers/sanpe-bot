import { command } from '../lib/utils/command.js'

function resolver({ displayName }) {
  // eslint-disable-next-line max-len
  return `Hello ${displayName}! We're coding mindsers.blog : bot twitch & api part (server side). We're using ViteJS, nodejs to do that`
}

export default command('project', resolver, ['projet'])
