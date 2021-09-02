import { handleCrypto } from '../src/bot/commands/crypto.js'

const input = [
  { source: 'DOGE' },
  { source: 'DOGE', destination: 'BTC' },
  { source: 'DOGE', destination: 'EUR', quantity: 1 },
  { source: 'ETH', destination: 2, quantity: 1 },
  { source: 'ETH', destination: 'USD', quantity: 1.23 },
  { source: 'ETH', destination: 'USD', quantity: '1,23' },
  { source: 'BTC', destination: 'ETH', quantity: '1,23' },
  { source: 'BTC', destination: 'ETH', quantity: 'abc' },
]

const asyncForEach = async (array, callback) => {
  if (!array) return
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const processTest = async () => {
  await asyncForEach(input, async ({ source = 'BTC', destination = 'USD', quantity = 1 }) => {
    const result = await handleCrypto(source, destination, quantity)
    console.log(result)
  })
}

processTest().finally(() => process.exit(0))
