export function command(name, resolver = () => {}, aliases = []) {
  aliases.push(name)
  return {
    aliases: [...new Set(aliases)],
    resolver,
  }
}
