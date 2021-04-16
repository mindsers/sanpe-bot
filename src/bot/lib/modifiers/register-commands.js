const commandMemory = {}

export function registerCommands(...commandsAndAliases) {
  const commands = new Map()
  for (const command of commandsAndAliases) {
    if (commands.has(command.name)) {
      throw new Error(`Bad command declaration. There is already a resolver for !${command.name}`)
    }
    commands.set(command.name, command.resolver)
    if (command.aliases && Array.isArray(command.aliases)) {
      for (const alias of command.aliases) {
        if (alias === command.name) {
          console.log('Alias refer to the same command')
          continue
        }
        if (commands.has(alias)) {
          throw new Error(`Bad alias declaration. There is already a resolver for !${alias}`)
        }
        commands.set(alias, command.resolver)
      }
    }
  }
  return (incomingMessage, messageContext) => {
    if (!incomingMessage.text.startsWith('!')) {
      return { ...messageContext } // Ignore if not a command
    }

    const args = incomingMessage.text.trim().slice(1).split(' ')
    const commandName = args.shift().toLowerCase()

    if (!commands.has(commandName)) {
      return {
        ...messageContext,
        message: `This command doesn't exist or you can't type. Respect me please!`,
      }
    }

    return {
      ...messageContext,
      message: commands.get(commandName)({
        ...messageContext,
        command: {
          name: commandName,
          args,
          message: args.join(' '),
          memory: commandMemory,
        },
      }),
    }
  }
}
