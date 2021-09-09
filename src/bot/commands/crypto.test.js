import 'regenerator-runtime/runtime'

import { getCryptoValue } from './crypto.js'

describe('Get crypto value', () => {
  test.concurrent.each([
    ['DOGE'],
    ['DOGE', 'BTC'],
    ['DOGE', 'EUR', 1],
    ['ETH', 'USD', 1.23],
    ['ETH', 'USD', '1,23'],
    ['BTC', 'ETH', '1,23'],
  ])('Should get 1,23 BTC value in ETH', async (argOne, argTwo, argThree) => {
    const { base, cost, target } = await getCryptoValue(argOne, argTwo, argThree)

    expect(typeof cost).toBe('number')
    expect(cost).toBeGreaterThan(0)
    expect(target).toStrictEqual(argTwo || 'USD')
    expect(base).toStrictEqual(argOne)
  })

  test('Should throw when currency is an number', async () => {
    await expect(getCryptoValue('ETH', 2, 1)).rejects.toEqual('2 is not a valid currency')
  })

  test('Should throw when quantity is not a number', async () => {
    await expect(getCryptoValue('BTC', 'ETH', 'abc')).rejects.toEqual('abc is not a valid number')
  })
})
