import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#hello
export namespace Hello {

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
