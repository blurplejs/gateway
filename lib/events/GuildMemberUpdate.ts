import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-member-update
export type PayloadType = {}

export class GuildMemberUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
