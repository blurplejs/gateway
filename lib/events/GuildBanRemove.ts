import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-ban-remove
export type PayloadType = {}

export class GuildBanRemove extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
