import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-role-update
export type PayloadType = {}

export class GuildRoleUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
