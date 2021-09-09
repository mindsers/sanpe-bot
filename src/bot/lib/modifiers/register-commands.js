export function registerCommands(...commandsAndAliases) {
  const commands = new Map()
  for (const { aliases = [], resolver = () => {} } of commandsAndAliases) {
    if (aliases == null || !Array.isArray(aliases)) {
      throw new Error(`Command must have a name`) // If no aliases, there is no name
    }

    for (const alias of aliases) {
      if (commands.has(alias)) {
        throw new Error(`Alias or command "${alias}" already declared.`)
      }

      commands.set(alias, resolver)
    }
  }

  return async (incomingMessage, messageContext) => {
    if (!incomingMessage.text.startsWith('!')) {
      return { fulfilled: false } // Ignore if not a command
    }

    const args = incomingMessage.text.trim().slice(1).split(' ')
    const commandName = args.shift().toLowerCase()

    if (
      messageContext.avoidCommands &&
      Array.isArray(messageContext.avoidCommands) &&
      messageContext.avoidCommands.includes(commandName)
    ) {
      return { fulfilled: true }
    }

    if (!commands.has(commandName)) {
      return {
        message: `This command doesn't exist or you can't type. Respect me please!`,
        fulfilled: false,
      }
    }

    try {
      const result = await commands.get(commandName)({
        ...messageContext,
        command: {
          name: commandName,
          args,
          message: args.join(' '),
        },
      })

      if (typeof result === 'string') {
        return { message: result }
      }

      return result
    } catch (err) {
      console.error(`Something went wrong processing command ${commandName}`, err)

      return { message: 'The commander should check my healph' }
    }
  }
}
