import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#invalid-session
export namespace InvalidSession {

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
