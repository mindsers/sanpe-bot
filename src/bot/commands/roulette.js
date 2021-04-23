import { command } from '../lib/utils/command.js'

const barrelSize = 6

class Barrel {
  constructor(size = 6) {
    this.size = size
    this.slot = new Array(size).fill(false)
    this.slot[Math.random() * this.size] = true
  }

  shuffle() {
    let currentIndex = this.slot.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = this.slot[currentIndex]
      this.slot[currentIndex] = this.slot[randomIndex]
      this.slot[randomIndex] = temporaryValue
    }
  }

  shot() {
    this.shuffle()
    return this.slot[0]
  }

  isEmpty() {
    console.log('isEmpty', this.slot.length === 0)
    return this.slot.length === 0
  }
}

let barrel = new Barrel(barrelSize)

async function resolver({ isBroadcaster, isModerator, username: currentUser }) {
  if (isBroadcaster || isModerator) {
    return 'I can\'t kill you my lord <3 ! mindse4Stop'
  }

  if (barrel.shot() === true) {
    barrel = new Barrel(barrelSize) // refresh if someone is killed
    return {
      message: `You loose ${currentUser}!!! I'll kill you !!!`,
      banReason: `Russian roulette game`,
      timeout: currentUser,
      timeoutDuration: 1,
    }
  } 
    return `In my great kindness, I let you survive, ${currentUser} !!!`
  
}

export default command('roulette', resolver, ['vladimir'])
