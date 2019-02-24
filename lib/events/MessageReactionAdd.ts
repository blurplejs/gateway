import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-reaction-add
export namespace MessageReactionAdd {

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
