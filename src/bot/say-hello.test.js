import { sayHello } from './say-hello'
import 'regenerator-runtime/runtime'

/* eslint-disable no-undef */
const modifier = sayHello()

test.concurrent.each([
  ['cc'],
  ['yooooooooooooooo'],
  ['hellooo'],
  ['coucou'],
  ['heeeeeeey'],
  ['hey'],
  ['bonsoir'],
  ['hi'],
  ['bonjour'],
  ['salut'],
])('sayHello should say hello when someone say %s', async text => {
  const context = modifier({ text }, { username: 'mindsers', memory: {} })
  expect(context.message).toBeTruthy()
})

test('sayHello should say hello only once', () => {
  const context1 = modifier({ text: `Salut c'est moi` }, { username: 'mindsers', memory: {} })
  const context2 = modifier({ text: `Salut c'est moi` }, { username: 'mindsers', memory: context1.memory })
  expect(context2.message).toBeFalsy()
})

test('sayHello should say hello when mentioned', () => {
  const context1 = modifier({ text: `Salut c'est moi` }, { username: 'mindsers', memory: {} })
  const context2 = modifier(
    { text: `Salut c'est moi @bot` },
    { username: 'mindsers', memory: context1.memory, bot: 'bot' },
  )
  expect(context2.message).toBeTruthy()
})

test('sayHello should not say hello when talking to someone else', () => {
  const context = modifier({ text: `Salut @aartwix` }, { username: 'mindsers', memory: {}, bot: 'bot' })
  expect(context.message).toBeFalsy()
})
