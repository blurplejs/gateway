import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#channel-update
export namespace ChannelUpdate {

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
