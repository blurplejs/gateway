import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-emojis-update
export type PayloadType = {}

export class GuildEmojisUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
