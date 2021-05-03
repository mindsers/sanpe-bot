/* eslint-disable no-undef */
import { parseUser } from './parse-user.js'

const modifier = parseUser()
const tags = {
  'badge-info': null,
  badges: { moderator: '1', partner: '1' },
  color: '#54BC75',
  'display-name': 'Moobot',
  emotes: null,
  flags: '139-159:,161-190:',
  id: 'bf9d116b-7c50-4e37-bbc0-f59ab40b8473',
  mod: true,
  'room-id': '188836657',
  subscriber: false,
  'tmi-sent-ts': '1619729163257',
  turbo: false,
  'user-id': '1564983',
  'user-type': 'mod',
  'emotes-raw': null,
  'badge-info-raw': null,
  'badges-raw': 'moderator/1,partner/1',
  username: 'moobot',
  'message-type': 'chat',
}

test('parseUser should not stop modifiers chain', () => {
  const context = modifier({}, {})

  expect(context.fulfilled).toBeFalsy()
})

test('parseUser should add username', () => {
  const context = modifier({ tags }, {})

  expect(context.username).toBe('moobot')
  expect(context.displayName).toBe('Moobot')
})

test('parseUser should add user properties', () => {
  const context = modifier({ tags }, {})

  expect(context.isBroadcaster).toBeFalsy()
  expect(context.isModerator).toBeTruthy()
  expect(context.isSubscriber).toBeFalsy()
})
