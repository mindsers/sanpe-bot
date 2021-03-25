export function resolver({ client, target, context }) {
    client.say(target, `​Thanks for asking ${context['display-name']}! To support @mindsers using Patreon go to https://www.patreon.com/mindsersit`)
}