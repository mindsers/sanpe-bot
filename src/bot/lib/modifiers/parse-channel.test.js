/* eslint-disable no-undef */
import { parseChannel } from './parse-channel'

test('parseChannel should not stop modifiers chain', () => {
  const modifier = parseChannel()
  const context = modifier({ channel: '#mindsers' })

  expect(context.fulfilled).toBeFalsy()
})

test('parseChannel should add broadcaster username to context', () => {
  const modifier = parseChannel()
  const context = modifier({ channel: '#mindsers' })

  expect(context.broadcaster).toBe('mindsers')
})

test('parseChannel should add channel to context', () => {
  const modifier = parseChannel()
  const context = modifier({ channel: '#mindsers' })

  expect(context.channel).toBe('#mindsers')
})
