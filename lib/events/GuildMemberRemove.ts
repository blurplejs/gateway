import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-member-remove
export namespace GuildMemberRemove {

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
