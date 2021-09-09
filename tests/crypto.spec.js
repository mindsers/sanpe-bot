import 'regenerator-runtime/runtime'

import assert from 'assert'
import { cryptoResultFormatter } from '../src/bot/lib/utils/currency.js'
import { getCryptoValue } from '../src/bot/commands/crypto.js'

describe('Get crypto value', () => {
  test('Should get 1 DOGE value', async () => {
    const { base, cost, target } = await getCryptoValue('DOGE')
    assert.strictEqual(base, 'DOGE')
    expect(typeof cost).toBe('number')
    expect(cost).toBeGreaterThan(0)
    assert.strictEqual(target, 'USD')
  })

  test('Should get 1 DOGE value in BTC', async () => {
    const { base, cost, target } = await getCryptoValue('DOGE', 'BTC')
    assert.strictEqual(base, 'DOGE')
    expect(typeof cost).toBe('number')
    expect(cost).toBeGreaterThan(0)
    assert.strictEqual(target, 'BTC')
  })

  test('Should get 1 DOGE value in EUR', async () => {
    const { base, cost, target } = await getCryptoValue('DOGE', 'EUR', 1)
    assert.strictEqual(base, 'DOGE')
    expect(typeof cost).toBe('number')
    expect(cost).toBeGreaterThan(0)
    assert.strictEqual(target, 'EUR')
  })

  test('Should throw when currency is an number', async () => {
    await expect(getCryptoValue('ETH', 2, 1)).rejects.toEqual('2 is not a valid currency')
  })

  test('Should get 1.23 ETH value in USD', async () => {
    const { base, cost, target } = await getCryptoValue('ETH', 'USD', 1.23)
    assert.strictEqual(base, 'ETH')
    expect(typeof cost).toBe('number')
    expect(cost).toBeGreaterThan(0)
    assert.strictEqual(target, 'USD')
  })

  test('Should get 1,23 ETH value in USD', async () => {
    const { base, cost, target } = await getCryptoValue('ETH', 'USD', '1,23')
    assert.strictEqual(base, 'ETH')
    expect(typeof cost).toBe('number')
    expect(cost).toBeGreaterThan(0)
    assert.strictEqual(target, 'USD')
  })

  test('Should get 1,23 BTC value in ETH', async () => {
    const { base, cost, target } = await getCryptoValue('BTC', 'ETH', '1,23')
    assert.strictEqual(base, 'BTC')
    expect(typeof cost).toBe('number')
    expect(cost).toBeGreaterThan(0)
    assert.strictEqual(target, 'ETH')
  })

  test('Should throw when quantity is not a number', async () => {
    await expect(getCryptoValue('BTC', 'ETH', 'abc')).rejects.toEqual('abc is not a valid number')
  })
})

describe('Format crypto result', () => {
  test('Should format 1 DOGE value into EUR', () => {
    expect(cryptoResultFormatter(10, 'DOGE', 1, 'EUR')).toEqual('10 DOGE is worth €10.00')
  })
  test('Should format 1 DOGE value into DOLLAR', () => {
    expect(cryptoResultFormatter(1, 'DOGE', 1, 'USD')).toEqual('1 DOGE is worth $1.00')
  })

  test('Should format 1 EUR value into DOGE', () => {
    expect(cryptoResultFormatter(1, 'EUR', 1, 'DOGE')).toEqual('€1.00 is worth 1 DOGE')
  })

  test('Should format 1 USD value into EUR', () => {
    expect(cryptoResultFormatter(1, 'USD', 1, 'EUR')).toEqual('$1.00 is worth €1.00')
  })

  test('Should format 1 DOGE into ETH', () => {
    expect(cryptoResultFormatter(1, 'DOGE', 1, 'ETH')).toEqual('1 DOGE is worth 1 ETH')
  })

  test('Should properly format float value', () => {
    expect(cryptoResultFormatter(1.23, 'DOGE', 1, 'EUR')).toEqual('1.23 DOGE is worth €1.23')
  })

  test('Should properly format longer float value', () => {
    expect(cryptoResultFormatter(1.2326537838746, 'DOGE', 1, 'EUR')).toEqual('1.23 DOGE is worth €1.23')
  })

  test('Should properly format longer float value', () => {
    expect(cryptoResultFormatter(1.2326537838746, 'DOGE', 1.479983664, 'EUR')).toEqual('1.23 DOGE is worth €1.82')
  })

  test('Should properly format longer float value in crypt', () => {
    expect(cryptoResultFormatter(1.2326537838746, 'DOGE', 1.479983664, 'ETH')).toEqual('1.23 DOGE is worth 1.82 ETH')
  })
})

describe('Get crypto value and format', () => {
  const calculator = async (sourceCurrency, targetCurrency, quantity) => {
    const { base, cost, target } = await getCryptoValue(sourceCurrency, targetCurrency, quantity)
    return cryptoResultFormatter(quantity, base, cost, target)
  }

  test('Should format 1 DOGE value into EUR', async () => {
    expect(await calculator('DOGE', 'EUR', 1)).toMatch(/^\d+(?:\.\d+)? DOGE is worth €\d+(?:\.\d+)?/)
  })

  test('Should format 1 DOGE value into DOLLAR', async () => {
    expect(await calculator('DOGE', 'USD', 1)).toMatch(/^\d+(?:\.\d+)? DOGE is worth \$\d+(?:\.\d+)?/)
  })

  test('Should format 1 DOGE value into ETH', async () => {
    expect(await calculator('DOGE', 'ETH', 1)).toMatch(/^\d+(?:\.\d+)? DOGE is worth \d+(?:\.\d+)? ETH/)
  })

  test('Should format 1 EUR value into ETH', async () => {
    expect(await calculator('EUR', 'ETH', 1)).toMatch(/^€\d+(?:\.\d+)? is worth \d+(?:\.\d+)? ETH/)
  })

  test('Should format 1 USD value into EUR', async () => {
    expect(await calculator('USD', 'EUR', 1)).toMatch(/^\$\d+(?:\.\d+)? is worth €\d+(?:\.\d+)?/)
  })

  test('Should throw when piping nonsense', async () => {
    await expect(calculator('DOGE', 'EUR', 'abc')).rejects.toEqual('abc is not a valid number')
  })
})
