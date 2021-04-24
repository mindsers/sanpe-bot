import { chatEvents } from '../lib/utils/const.js'

export default {
  action: chatEvents.cheer,
  resolver: (channel, userstate, message) => {
    console.log(this) // With the bind into the registerEvents, we should possibly send a message

    // TODO: handle this when we can debug :D
    // Note: The amount of bits the user sent is inside the userstate (userstate.bits)
    // Read the Twitch API documentation for more information(https://dev.twitch.tv/docs/irc/tags/#privmsg-twitch-tags).
    console.log(userstate, message)

    this.sendMessage(`Thanks ${userstate['display-name']}, for your contribution, hope you like ${channel} content's`, {
      channels: [channel],
    })
  },
}
