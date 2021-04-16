const commandMemory = {}

export function registerCommands(...commandsAndAliases) {
  const commands = new Map()
  for (const { name, aliases = [], resolver = () => {} } of commandsAndAliases) {
    if (commands.has(name)) {
      throw new Error(`Bad command declaration. There is already a resolver for !${name}`)
    }

    commands.set(name, resolver)

    if (aliases == null || !Array.isArray(aliases)) {
      continue // no aliases
    }

    for (const alias of aliases) {
      if (alias === name) {
        continue // useless
      }

      if (commands.has(alias)) {
        throw new Error(`Bad alias declaration. There is already a resolver for !${alias}`)
      }

      commands.set(alias, resolver)
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
