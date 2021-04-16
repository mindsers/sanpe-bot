export function command(name, resolver = () => {}) {
    return {
        name,
        resolver
    }
}