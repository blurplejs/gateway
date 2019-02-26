import EventType from './EventType'
import UnavailableGuild from '../objects/UnavailableGuild'
import { User } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#ready
export namespace Ready {

    export type PayloadType = {
        v: number,
        user: User,
        private_channels: any[],
        guilds: UnavailableGuild[],
        session_id: string,
        _trace: string[],
        shard?: [number, number]
    }

    export class Event extends EventType<PayloadType> {

        constructor () {
            super()
        }

        get payload () {
            return {
                v: 6
            }
        }
    
    }

}
