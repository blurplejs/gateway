import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-reaction-remove-all
export namespace MessageReactionRemoveAll {

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
