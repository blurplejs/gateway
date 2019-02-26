import EventType from './EventType'
import UnavailableGuild from '../objects/UnavailableGuild'
import { User } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#ready
export type PayloadType = {
    v: number,
    user: User,
    private_channels: any[],
    guilds: UnavailableGuild[],
    session_id: string,
    _trace: string[],
    shard?: [number, number]
}

export class Ready extends EventType<PayloadType> {

    constructor (protected user: User, protected unavailableGuilds: UnavailableGuild[], protected session: string) {
        super()
    }

    get payload () {
        return {
            v: 6,
            user: this.user,
            private_channels: [],
            guilds: this.unavailableGuilds,
            relationships: [],
            session_id: this.session,
            _trace: ['fake-gateway-1']
        }
    }

}
