export function command(name, resolver = () => {}, alias = []) {
  return {
    alias,
    name,
    resolver,
  }
}
