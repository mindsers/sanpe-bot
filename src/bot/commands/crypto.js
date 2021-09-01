import { command } from '../lib/utils/command.js'
import price from 'crypto-price'

async function resolver({ command: { args } }) {
  const [cryptoCurrency = 'BTC', currency = 'USD', num = 1] = args

  try {
    const { base, price: cost, target } = await price.getCryptoPrice(currency, cryptoCurrency)

    return `${num} ${base} is worth ${Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency,
    }).format(cost * num)} ${target}`
  } catch (e) {
    console.error(e)

    return `Unable to retrieve value in ${currency} for crypto ${cryptoCurrency}`
  }
}

export default command('crypto', resolver)
