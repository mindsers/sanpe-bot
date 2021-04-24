import { chatEvents } from '../lib/utils/const.js'

// TODO: find a way to respond to the user
export default {
  action: chatEvents.subscription,
  resolver: (channel, username, method, message, userstate) => {
    console.log(this) // With the bind into the registerEvents, we should possibly send a message

    // TODO: handle this when we can debug :D
    console.log(method, message, userstate)

    this.sendMessage(`Thanks ${username}, for your subscription, hope you like ${channel} content's`, {
      channels: [channel],
    })
  },
}
