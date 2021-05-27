/* eslint-disable no-undef */
import { command } from './command'

const handler = () => {}

test('Serialize simple command', () => {
  const result = command('test', handler)

  expect(result.aliases).toStrictEqual(['test'])
  expect(result.resolver).toBe(handler)
})

test('Serialize command w/ aliases', () => {
  const result = command('test', handler, ['tests'])

  expect(result.aliases).toStrictEqual(['tests', 'test'])
  expect(result.resolver).toBe(handler)
})
