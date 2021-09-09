import 'regenerator-runtime/runtime'

import { cryptoResultFormatter } from './currencies.js'

describe('Get crypto value and format', () => {
  test.concurrent.each([
    ['10 DOGE is worth €10.00', [10, 'DOGE', 1, 'EUR']],
    ['1 DOGE is worth $1.00', [1, 'DOGE', 1, 'USD']],
    ['€1.00 is worth 1 DOGE', [1, 'EUR', 1, 'DOGE']],
    ['$1.00 is worth €1.00', [1, 'USD', 1, 'EUR']],
    ['1 DOGE is worth 1 ETH', [1, 'DOGE', 1, 'ETH']],
    ['1.23 DOGE is worth €1.23', [1.23, 'DOGE', 1, 'EUR']],
    ['1.23 DOGE is worth €1.23', [1.2326537838746, 'DOGE', 1, 'EUR']],
    ['1.23 DOGE is worth €1.82', [1.2326537838746, 'DOGE', 1.479983664, 'EUR']],
    ['1.23 DOGE is worth 1.82 ETH', [1.2326537838746, 'DOGE', 1.479983664, 'ETH']],
  ])('Should format 1 cryto to value into crypto or fiat', async (result, args) => {
    expect(await cryptoResultFormatter(...args)).toMatch(result)
  })
})
