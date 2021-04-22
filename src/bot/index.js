import ebaubir from './commands/ebaubir.js'
import love from './commands/love.js'
import lurk from './commands/lurk.js'
import maeva from './commands/maeva.js'
import patreon from './commands/patreon.js'
import project from './commands/project.js'
import roulette from './commands/roulette.js'
import shoutout from './commands/shoutout.js'
import socials from './commands/socials.js'
import { Bot } from './lib/bot.js'
import { parseChannel } from './lib/modifiers/parse-channel.js'
import { parseUser } from './lib/modifiers/parse-user.js'
import { registerCommands } from './lib/modifiers/register-commands.js'
import { command } from './lib/utils/command.js'
import { only } from './lib/utils/only.js'
import { sayHello } from './say-hello.js'

export const bot = new Bot({
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: ['Mindsers'],
})

bot.messagePipe(
  parseChannel(),
  parseUser(),
  only(
    'mindsers',
    registerCommands(
      command('discord', () => 'Join the discord server! https://discord.gg/WrHUfSC'),
      command('uses', () => `I listed my complete setup on this "uses" page: https://mindsers.blog/fr/uses/`),
      ebaubir,
      lurk,
      socials,
      patreon,
      maeva,
      love,
      shoutout,
      project,
      roulette,
    ),
  ),
  sayHello(),
)
