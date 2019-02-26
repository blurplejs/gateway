import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-role-delete
export type PayloadType = {}

export class GuildRoleDelete extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
