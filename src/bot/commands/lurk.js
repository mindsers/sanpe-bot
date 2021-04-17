import { command } from '../lib/utils/command.js'

export default command(
  'lurk',
  ({ displayName }) => `Hey! Thanks for lurking the stream ${displayName}! Poooound Poooound Poooound`,
)
