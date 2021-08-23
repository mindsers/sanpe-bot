import { command } from '../lib/utils/command.js'
import price from 'crypto-price'

async function resolver({ command: { args } }) {
  const [cryptoCurrency = 'BTC', currency = 'USD'] = args

  try {
    const { base, price: cost, target } = await price.getCryptoPrice(currency, cryptoCurrency)
    
    return `1 ${base} is worth ${cost} ${target}`
  } catch (e) {
    console.error(e)
    
    return `Unable to retrieve value in ${currency} for crypto ${cryptoCurrency}`
  }
}

export default command('crypto', resolver)
