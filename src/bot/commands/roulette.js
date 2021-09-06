import Gun from '../lib/utils/gun.js'
import { command } from '../lib/utils/command.js'

const BARREL_SIZE = 6

let gun = new Gun(BARREL_SIZE)

async function resolver({ isBroadcaster, isModerator, username: currentUser }) {
  if (isBroadcaster || isModerator) {
    return `I can't kill you my lord <3 ! mindse4Stop`
  }

  gun.rollBarrel()
  if (gun.shot() === true) {
    gun = new Gun(BARREL_SIZE) // refresh if someone is killed
    return {
      message: `You loose ${currentUser}!!! I'll kill you !!!`,
      banReason: `Russian roulette game`,
      timeout: currentUser,
      timeoutDuration: 1,
    }
  }
  gun.addBullet()

  // eslint-disable-next-line max-len
  return `In my great kindness, I let you survive, ${currentUser} !!! Next try ${gun.countBullets()} will be in barrel of ${
    gun.barrelSize
  }`
}

export default command('roulette', resolver, ['vladimir'])
