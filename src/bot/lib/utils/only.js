export function onlyFor(channel, modifier) {
  const memoryKey = `${Math.random().toString(36).substring(2)}-${channel}-scoped-memory`

  return async (incomingMessage, previousCtx) => {
    if (previousCtx.broadcaster !== channel) {
      return previousCtx
    }

    const previousMemory = previousCtx.memory || {}
    const previousChannelMemory = previousMemory[memoryKey] || {}

    const currentCtx = await modifier(incomingMessage, {
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

  return (...args) => async (incomingMessage, previousCtx) => {
    if (previousCtx.broadcaster !== channel) {
      return previousCtx
    }

    const previousMemory = previousCtx.memory || {}
    const previousChannelMemory = previousMemory[memoryKey] || {}

    const currentCtx = await modifierFactory(...args)(incomingMessage, {
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
