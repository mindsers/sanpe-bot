let targetName = null

export function resolver({ client, target, context: { mod }, msg }) {
    const [, username] = msg.split(' ')

    if (username != null && mod === true) {
        targetName = username
    }

    if (targetName == null) {
        return
    }

    client.say(target, `Follow @${targetName} over at twitch.tv/${targetName} ! <3 Kreygasm`)
}