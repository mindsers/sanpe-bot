import { command } from '../lib/utils/command.js'

function resolver() {
  // eslint-disable-next-line max-len
  return `Maëva is a special guest of this channel on every chill stream (also because she is @mindsers' wife). Maëva has her own emote (Sub tier 3). All her social media links are listed on https://travel-and-food.com/`
}

export default command('maevatravelandfood', resolver, ['maeva'])
