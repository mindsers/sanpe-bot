const commandMemory = {}

export function registerCommands(...commandsAndAliases) {
    const commands = commandsAndAliases
        .map(el => {
            if (el.alias == null) {
                return el
            }
            
            const cmd = commandsAndAliases.find(cmd => cmd.name === el.commandName)
            if (cmd == null || cmd.resolver == null) {
                console.log(`Bad alias declaration. There is no command resolver for !${el.commandName}`)
                return null
            }

            return {
                name: el.alias,
                resolver: cmd.resolver
            }
        })
        .filter(el => el != null)

    return (incomingMessage, messageContext) => {
        if (!incomingMessage.text.startsWith('!')) {
            return { ...messageContext } // Ignore if not a command
        }

        const args = incomingMessage.text.trim().slice(1).split(' ');
	    const commandName = args.shift().toLowerCase();
        const commandContext = {
            ...messageContext,
            command: {
                name: commandName.replace('!', ''),
                args,
                message: args.join(' '),
                memory: commandMemory,
            }
        }

        for (const command of commands) {
            if (command.name === commandContext.command.name) {
                return {
                    ...messageContext,
                    message: command.resolver(commandContext)
                }
            }
        }

        return { 
            ...messageContext,
            message: `This command doesn't exist or you can't type. Respect me please!`,
        }
    }
}