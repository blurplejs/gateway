import EventType from './EventType'
import { Channel } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#channel-update
export type PayloadType = Channel

export class ChannelUpdate extends EventType<PayloadType> {

    constructor (protected channel: Channel) {
        super()
    }

    get payload () {
        return this.channel
    }

}
