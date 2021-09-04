import { shuffle } from './array.js'

export default class Barrel {
  bullets = 0
  size = 0
  rollCount = 0
  slots = []

  constructor(size = 6, numberOfBullets = 1) {
    if (numberOfBullets > size) {
      throw new Error('Number of bullets cannot be greater than size')
    }

    this.size = size

    this.slots = new Array(size).fill(false)

    this.addBullet(numberOfBullets)
  }

  roll() {
    this.slots = shuffle(this.slots)
    this.rollCount++
  }

  shot() {
    return this.slots[0]
  }

  addBullet(numberOfBullets = 1) {
    for (let i = 0; i < numberOfBullets; i++) {
      const emptySlot = this.slots.findIndex(s => s === false)
      if (emptySlot < 0) return
      this.slots[this.bullets] = true
      this.bullets++
    }
  }
}
