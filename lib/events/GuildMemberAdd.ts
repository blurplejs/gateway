import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-member-add
export namespace GuildMemberAdd {

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
