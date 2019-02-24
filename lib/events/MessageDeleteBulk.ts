import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-delete-bulk
export namespace MessageDeleteBulk {

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
