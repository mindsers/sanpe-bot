export function command(name, resolver = () => {}, aliases = []) {
  return {
    aliases,
    name,
    resolver,
  }
}
