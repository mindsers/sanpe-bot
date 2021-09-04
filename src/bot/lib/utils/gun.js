import { shuffle } from './array.js'

export default class Gun {
  barrelSize = 0
  barrelRollCount = 0
  barrelSlots = []

  constructor(size = 6, numberOfBullets = 1) {
    if (numberOfBullets > size) {
      throw new Error('Number of bullets cannot be greater than size')
    }

    this.barrelSize = size

    this.barrelSlots = new Array(this.barrelSize).fill(false)

    this.addBullet(numberOfBullets)
  }

  rollBarrel() {
    this.barrelSlots = shuffle(this.barrelSlots)
    this.barrelRollCount++
  }

  shot() {
    return this.barrelSlots[0]
  }

  addBullet(numberOfBullets = 1) {
    for (let i = 0; i < numberOfBullets; i++) {
      const emptySlot = this.barrelSlots.findIndex(s => s === false)
      if (emptySlot < 0) return
      this.barrelSlots[emptySlot] = true
    }
  }

  countBullets() {
    return this.barrelSlots.filter(s => s === true).length
  }
}
