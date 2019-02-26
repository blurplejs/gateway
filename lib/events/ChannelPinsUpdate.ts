import EventType from './EventType'
import { Snowflake } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#channel-pins-update
export type PayloadType = {
    channel_id: Snowflake,
    last_pin_timestamp?: number
}

export class ChannelPinsUpdate extends EventType<PayloadType> {

    constructor (protected snowflake: Snowflake) {
        super()
    }

    get payload () {
        return {
            channel_id: this.snowflake
        }
    }

}
