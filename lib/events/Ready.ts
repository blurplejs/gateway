import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#ready
export namespace Ready {

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
