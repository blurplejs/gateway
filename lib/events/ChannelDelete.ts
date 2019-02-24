import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#channel-delete
export namespace ChannelDelete {

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
