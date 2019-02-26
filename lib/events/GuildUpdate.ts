import EventType from './EventType'
import { Guild } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-update
export type PayloadType = Guild

export class GuildUpdate extends EventType<PayloadType> {

    constructor (protected guild: Guild) {
        super()
    }

    get payload () {
        return this.guild
    }

}
