export function avoidCommands(avoidCommands = []) {
  return () => ({ avoidCommands })
}
