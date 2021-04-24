export function only(channel, modifier) {
  return (incommingMessage, previousCtx) => {
    if (previousCtx.channel === channel) {
      return {}
    }

    const previousMemory = previousCtx.memory || {}
    const previousChannelMemory = previousMemory[channel] || {}

    const currentCtx = modifier(incommingMessage, {
      ...previousCtx,
      memory: previousChannelMemory,
    })

    const currentChannelMemory = currentCtx.memory || {}

    return {
      ...previousCtx,
      ...currentCtx,
      memory: {
        ...previousMemory,
        [channel]: {
          ...previousChannelMemory,
          ...currentChannelMemory,
        },
      },
    }
  }
}
