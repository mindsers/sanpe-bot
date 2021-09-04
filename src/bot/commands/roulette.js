import Barrel from '../lib/utils/barrel.js'
import { command } from '../lib/utils/command.js'

const BARREL_SIZE = 6

let barrel = new Barrel(BARREL_SIZE)

async function resolver({ isBroadcaster, isModerator, username: currentUser }) {
  if (isBroadcaster || isModerator) {
    return `I can't kill you my lord <3 ! mindse4Stop`
  }

  barrel.roll()
  const killed = barrel.shot()

  if (killed) {
    barrel = new Barrel(BARREL_SIZE) // refresh if someone is killed
    return {
      message: `You loose ${currentUser}!!! I'll kill you !!!`,
      banReason: `Russian roulette game`,
      timeout: currentUser,
      timeoutDuration: 1,
    }
  }
  barrel.addBullet()

  // eslint-disable-next-line max-len
  return `In my great kindness, I let you survive, ${currentUser} !!! Next try ${barrel.bullet} will be in barrel of ${barrel.size}`
}

export default command('roulette', resolver, ['vladimir'])
