import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-members-chunk
export type PayloadType = {}

export class GuildMembersChunk extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
