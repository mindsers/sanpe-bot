export function resolver({ client, target }) {
    const sides = 6
    client.say(target, `You rolled a ${Math.floor(Math.random() * sides) + 1}`)
}