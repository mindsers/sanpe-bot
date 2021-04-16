const commandMemory = {}

export function registerCommands(...commandsAndAliases) {
  const commandProcessor = new Map()
  for (const command of commandsAndAliases) {
    if (commandProcessor.has(command.name)) {
      console.log(
        `Bad command declaration. There is already a resolver for !${command.name}`,
      )
      throw new Error('Command redefinition')
    }
    commandProcessor.set(command.name, command.resolver)
    if (command.alias && Array.isArray(command.alias)) {
      for (const alias of command.alias) {
        if (alias === command.name) {
          console.log('Alias refer to the same command')
          continue
        }
        if (commandProcessor.has(alias)) {
          console.log(
            `Bad alias declaration. There is already a resolver for !${alias}`,
          )
          throw new Error('Alias redefinition')
        }
        commandProcessor.set(alias, command.resolver)
      }
    }
  }
  return (incomingMessage, messageContext) => {
    if (!incomingMessage.text.startsWith('!')) {
      return { ...messageContext } // Ignore if not a command
    }

    const args = incomingMessage.text.trim().slice(1).split(' ')
    const commandName = args.shift().toLowerCase()
    const commandContext = {
      ...messageContext,
      command: {
        name: commandName.replace('!', ''),
        args,
        message: args.join(' '),
        memory: commandMemory,
      },
    }

    if (!commandProcessor.has(commandContext.command.name)) {
      return {
        ...messageContext,
        message: `This command doesn't exist or you can't type. Respect me please!`,
      }
    }

    return {
      ...messageContext,
      message: commandProcessor.get(commandContext.command.name)(
        commandContext,
      ),
    }
  }
}
