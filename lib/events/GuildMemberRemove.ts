import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-member-remove
export type PayloadType = {}

export class GuildMemberRemove extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
