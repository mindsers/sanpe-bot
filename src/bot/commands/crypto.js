import { command } from '../lib/utils/command.js'
import { cryptoResultFormatter } from '../lib/utils/currency.js'
import price from 'crypto-price'

export const getCryptoValue = async (cryptoCurrency = 'BTC', currency = 'USD', quantity = 1) => {
  if (typeof cryptoCurrency !== 'string') {
    return Promise.reject(`${cryptoCurrency} is not a valid currency`)
  }
  if (typeof currency !== 'string') {
    return Promise.reject(`${currency} is not a valid currency`)
  }

  cryptoCurrency = cryptoCurrency.toUpperCase()
  currency = currency.toUpperCase()

  const tQuantity = quantity // For logging purpose
  if (typeof quantity === 'string') {
    quantity = parseFloat(quantity.replace(/,/, '.'))
    if (isNaN(quantity)) {
      return Promise.reject(`${tQuantity} is not a valid number`)
    }
  }

  const { base, price: cost, target } = await price.getCryptoPrice(currency, cryptoCurrency)

  return { base, cost: parseFloat(cost), target }
}

async function resolver({ command: { args } }) {
  const [cryptoCurrency = 'BTC', currency = 'USD', num = 1] = args

  try {
    const { base, cost, target } = await getCryptoValue(cryptoCurrency, currency, num)

    return cryptoResultFormatter(num, base, cost, target)
  } catch (e) {
    return `Unable to retrieve value in ${cryptoCurrency} for ${currency} due to ${e}`
  }
}

export default command('crypto', resolver)
