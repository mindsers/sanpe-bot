export function command(name, resolver = () => {}, aliases = []) {
  return {
    aliases: Array.from(new Set([...aliases, name])),
    resolver,
  }
}
