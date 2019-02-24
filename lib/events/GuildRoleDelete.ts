import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-role-delete
export namespace GuildRoleDelete {

    export type PayloadType = {}

    export class Event extends EventType<PayloadType> {

        constructor () {
            super()
        }

        get payload () {
            return {}
        }
    
    }

}
