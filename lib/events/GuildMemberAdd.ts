import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-member-add
export type PayloadType = {}

export class GuildMemberAdd extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
