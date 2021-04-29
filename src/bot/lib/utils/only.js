export function onlyFor(channel, modifier) {
  const memoryKey = `${Math.random().toString(36).substring(2)}-${channel}-scoped-memory`

  return (incomingMessage, previousCtx) => {
    if (previousCtx.channel === channel) {
      return {}
    }

    const previousMemory = previousCtx.memory || {}
    const previousChannelMemory = previousMemory[memoryKey] || {}

    const currentCtx = modifier(incomingMessage, {
      ...previousCtx,
      memory: previousChannelMemory,
    })

    const currentChannelMemory = currentCtx.memory || {}

    return {
      ...previousCtx,
      ...currentCtx,
      memory: {
        ...previousMemory,
        [memoryKey]: {
          ...previousChannelMemory,
          ...currentChannelMemory,
        },
      },
    }
  }
}

export async function composeOnlyFor(channel, modifierFactory) {
  const memoryKey = `${Math.random().toString(36).substring(2)}-${channel}-scoped-memory`

  return (...args) => (incomingMessage, previousCtx) => {
    if (previousCtx.channel === channel) {
      return {}
    }

    const previousMemory = previousCtx.memory || {}
    const previousChannelMemory = previousMemory[memoryKey] || {}

    const currentCtx = modifierFactory(...args)(incomingMessage, {
      ...previousCtx,
      memory: previousChannelMemory,
    })

    const currentChannelMemory = currentCtx.memory || {}

    return {
      ...previousCtx,
      ...currentCtx,
      memory: {
        ...previousMemory,
        [memoryKey]: {
          ...previousChannelMemory,
          ...currentChannelMemory,
        },
      },
    }
  }
}
