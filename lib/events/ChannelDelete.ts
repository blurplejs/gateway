import EventType from './EventType'
import { Channel } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#channel-delete
export namespace ChannelDelete {

    export type PayloadType = Channel

    export class Event extends EventType<PayloadType> {

        constructor (protected channel: Channel) {
            super()
        }

        get payload () {
            return this.channel
        }
    
    }

}
