/* eslint-disable no-undef */
import { parseUser } from './parse-user.js'

const modifier = parseUser()

test('parseUser should not stop modifiers chain', () => {
  const context = modifier({ tags: {} }, {})

  expect(context.fulfilled).toBeFalsy()
})
