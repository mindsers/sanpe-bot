import { command } from '../lib/utils/command.js'
import price from 'crypto-price'

async function resolver({ command: { args } }) {
  let [cryptoCurrency, currency] = args

  if (currency === null) {
    currency = 'USD'
  }
  if (cryptoCurrency === null) {
    cryptoCurrency = 'BTC'
  }

  try {
    const value = await price.getCryptoPrice(currency, cryptoCurrency)
    return `1 ${value.base} is worth ${value.price} ${value.target}`
  } catch (e) {
    console.error(e)
    return `Unable to retrieve value in ${currency} for crypto ${cryptoCurrency}`
  }
}

export default command('crypto', resolver)
