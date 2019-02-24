import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#presence-update
export namespace PresenceUpdate {

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
