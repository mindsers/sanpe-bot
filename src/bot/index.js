import { Bot } from './lib/bot.js'
import { registerCommands } from './lib/modifiers/register-commands.js'
import { parseUser } from './lib/modifiers/parse-user.js'
import { parseChannel } from './lib/modifiers/parse-channel.js'
import { command } from './lib/utils/command.js'
import { alias } from './lib/utils/alias.js'

import { resolver as loveResolver } from './commands/love.js'
import { resolver as shoutoutResolver } from './commands/shoutout.js'
import { sayHello } from './say-hello.js'

export const bot = new Bot({
  identity: {
      username: process.env.BOT_USERNAME,
      password: process.env.OAUTH_TOKEN,
  },
  channels: [ 
      'Mindsers'
  ]
})

bot.messagePipe(
  parseChannel(),
  parseUser(),
  registerCommands(
    command('discord', () => `​Join the discord server! https://discord.gg/WrHUfSC`),
    command('ebaubir', () => `verbe pronominal. Être stupéfait, interdit, marquer une grande surprise. mindse4Shook mindse4Shook mindse4Shook`),
    command('lurk', ({ displayName }) => `Hey! Thanks for lurking the stream ${displayName}! Poooound Poooound Poooound`),
    command('project', ({ displayName }) => `Hello ${displayName}! We're coding mindsers.blog : bot twitch & api part (server side). We're using ViteJS, nodejs to do that`),
    command('uses', () => `I listed my complete setup on this "uses" page: https://mindsers.blog/fr/uses/`),
    command('socials', () => `​You can find my socials on my personal website: https://nathanaelcherrier.dev/`),
    command('patreon', ({ displayName }) => `​Thanks for asking ${displayName}! To support @mindsers using Patreon go to https://www.patreon.com/mindsersit`),
    command('maevatravelandfood', () => `​Maëva is a special guest of this channel on every chill stream (also because she is @mindsers' wife). Maëva has her own emote (Sub tier 3). All her social media links are listed on https://travel-and-food.com/`),
    command('love', loveResolver),
    command('shoutout', shoutoutResolver),
    alias('projet', 'project'),
    alias('social', 'socials'),
    alias('maeva', 'maevatravelandfood'),
    alias('amour', 'love'),
    alias('so', 'shoutout'),
  ),
  sayHello(),
)
