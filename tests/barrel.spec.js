import Barrel from '../src/bot/lib/utils/barrel'
import assert from 'assert'

describe('Barrel', () => {
  test('Should create a barrel of desired size with one bullet', () => {
    const barrel = new Barrel(6)
    assert.equal(barrel.size, 6)
    assert.equal(barrel.bullets, 1)
    assert.deepEqual(barrel.slots, [true, false, false, false, false, false])
    assert.equal(barrel.rollCount, 0)
  })

  test('Should not create a barrel with more bullet than barrel can contains', () => {
    assert.throws(() => new Barrel(6, 7))
  })

  test('Should add bullet to slots', () => {
    const barrel = new Barrel(6)
    assert.equal(barrel.size, 6)
    assert.equal(barrel.bullets, 1)
    barrel.addBullet()
    assert.equal(barrel.bullets, 2)
    barrel.addBullet()
    assert.equal(barrel.bullets, 3)
  })

  test('Should not add bullet if no empty slots', () => {
    const barrel = new Barrel(6, 6)
    assert.equal(barrel.bullets, 6)
    assert.equal(barrel.bullets, 6)
    barrel.addBullet()
    assert.equal(barrel.bullets, 6)
  })

  test('Should shuffle the barrel', () => {
    const barrel = new Barrel(6)
    const rolled = barrel.rollCount
    barrel.roll()
    assert.notEqual(barrel.rollCount, rolled)
  })

  test('Should trigger a shot', () => {
    const barrel = new Barrel(6)
    const killed = barrel.shot()
    assert.equal(typeof killed, 'boolean')
  })

  test('Should kill someone', () => {
    const barrel = new Barrel(6, 6)
    assert.equal(barrel.shot(), true)
  })
})
