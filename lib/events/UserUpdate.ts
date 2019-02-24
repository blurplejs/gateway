import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#user-update
export namespace UserUpdate {

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
