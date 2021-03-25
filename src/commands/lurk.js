export function resolver({ client, target, context }) {
    client.say(target, `Hey! Thanks for lurking the stream ${context['display-name']}! Poooound Poooound Poooound`)
}