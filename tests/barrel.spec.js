import 'regenerator-runtime/runtime'

import Gun from '../src/bot/lib/utils/gun.js'
import assert from 'assert'
import rouletteCommand from '../src/bot/commands/roulette'

describe('Gun test', () => {
  test('Should create a barrel of desired size with one bullet', () => {
    const gun = new Gun(6)
    assert.equal(gun.barrelSize, 6)
    assert.equal(gun.countBullets(), 1)
    assert.deepEqual(gun.barrelSlots, [true, false, false, false, false, false])
    assert.equal(gun.barrelRollCount, 0)
  })

  test('Should not create a barrel with more bullet than barrel can contains', () => {
    assert.throws(() => new Gun(6, 7))
  })

  test('Should add a bullet on the first free slot', () => {
    const gun = new Gun(6)
    assert.equal(gun.barrelSize, 6)
    assert.equal(gun.countBullets(), 1)
    assert.deepEqual(gun.barrelSlots, [true, false, false, false, false, false])
    gun.addBullet()
    assert.equal(gun.countBullets(), 2)
    assert.deepEqual(gun.barrelSlots, [true, true, false, false, false, false])
    gun.addBullet()
    assert.equal(gun.countBullets(), 3)
    assert.deepEqual(gun.barrelSlots, [true, true, true, false, false, false])
  })

  test('Should add bullet to slots', () => {
    const gun = new Gun(6)
    assert.equal(gun.barrelSize, 6)
    assert.equal(gun.countBullets(), 1)
    gun.addBullet()
    assert.equal(gun.countBullets(), 2)
    gun.addBullet()
    assert.equal(gun.countBullets(), 3)
  })

  test('Should not add bullet if no empty slots', () => {
    const gun = new Gun(6, 6)
    assert.equal(gun.countBullets(), 6)
    gun.addBullet()
    assert.equal(gun.countBullets(), 6)
  })

  test('Should shuffle the barrel', () => {
    const gun = new Gun(6)
    const rolled = gun.barrelRollCount
    gun.rollBarrel()
    assert.notEqual(gun.barrelRollCount, rolled)
  })

  test('Should trigger a shot', () => {
    const gun = new Gun(6)
    const killed = gun.shot()
    assert.equal(typeof killed, 'boolean')
  })

  test('Should kill someone', () => {
    const gun = new Gun(6, 6)
    assert.equal(gun.shot(), true)
  })
})

describe('Gun in command context', () => {
  test('Roulette command must be created', () => {
    assert.deepEqual(rouletteCommand.aliases, ['vladimir', 'roulette'])
  })

  test('Should not try to kill broadcaster', async () => {
    const tryToKillBroadcaster = await rouletteCommand.resolver({ isBroadcaster: true })
    assert.equal(tryToKillBroadcaster, `I can't kill you my lord <3 ! mindse4Stop`)
  })

  test('Should not try to kill moderator', async () => {
    const tryToKillBroadcaster = await rouletteCommand.resolver({ isModerator: true })

    assert.equal(tryToKillBroadcaster, `I can't kill you my lord <3 ! mindse4Stop`)
  })

  test('Should try to kill user', async () => {
    for (let i = 0; i < 6; i++) {
      const result = await rouletteCommand.resolver({ username: 'someone' })

      if (typeof result === 'string') {
        expect(result).toMatch(
          /In my great kindness, I let you survive, someone !!! Next try \d+ will be in barrel of 6/,
        )
      }
      if (typeof result === 'object') {
        assert.equal(result.banReason, 'Russian roulette game')
        assert.equal(result.timeout, 'someone')
        assert.equal(result.timeoutDuration, 1)
        assert.equal(result.message, "You loose someone!!! I'll kill you !!!")
      }
    }
  })
})
