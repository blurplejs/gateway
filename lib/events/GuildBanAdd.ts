import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-ban-add
export type PayloadType = {}

export class GuildBanAdd extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
