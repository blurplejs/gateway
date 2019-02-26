import EventType from './EventType'
import { Snowflake } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#channel-pins-update
export namespace ChannelPinsUpdate {

    export type PayloadType = {
        channel_id: Snowflake,
        last_pin_timestamp?: number
    }

    export class Event extends EventType<PayloadType> {

        constructor () {
            super()
        }

        get payload () {
            return {}
        }
    
    }

}
