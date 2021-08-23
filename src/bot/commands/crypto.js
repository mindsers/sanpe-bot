import { command } from '../lib/utils/command.js'
import price from 'crypto-price'

async function resolver({ command: { args } }) {
  const [cryptoCurrency = 'BTC', currency = 'USD'] = args

  try {
    const { base, price, target } = await price.getCryptoPrice(currency, cryptoCurrency)
    
    return `1 ${base} is worth ${price} ${target}`
  } catch (e) {
    console.error(e)
    
    return `Unable to retrieve value in ${currency} for crypto ${cryptoCurrency}`
  }
}

export default command('crypto', resolver)
