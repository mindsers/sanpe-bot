import { command } from '../lib/utils/command.js'
import { currencies } from '../lib/utils/currencies.js'
import price from 'crypto-price'

// Declare it as a function and export for test purposes
export const handleCrypto = async (cryptoCurrency, currency, quantity) => {
  if (typeof cryptoCurrency !== 'string') {
    return `${cryptoCurrency} is not a valid currency`
  }
  if (typeof currency !== 'string') {
    return `${currency} is not a valid currency`
  }

  cryptoCurrency = cryptoCurrency.toUpperCase()
  currency = currency.toUpperCase()

  const tQuantity = quantity // For logging purpose
  if (typeof quantity === 'string') {
    quantity = parseFloat(quantity.replace(/,/, '.'))
    if (isNaN(quantity)) {
      return `${tQuantity} is not a valid number`
    }
  }

  try {
    const { base, price: cost, target } = await price.getCryptoPrice(currency, cryptoCurrency)

    if (currencies.indexOf(target) === -1) {
      return `${quantity} ${base} is worth ${(cost * quantity).toFixed(2)} ${target}`
    }

    return `${quantity} ${base} is worth ${Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency,
    }).format(cost * quantity)} ${target}`
  } catch (e) {
    console.error(e)

    return `Unable to retrieve value in ${cryptoCurrency} for ${currency}`
  }
}

async function resolver({ command: { args } }) {
  const [cryptoCurrency = 'BTC', currency = 'USD', num = 1] = args

  return await handleCrypto(cryptoCurrency, currency, num)
}

export default command('crypto', resolver)
