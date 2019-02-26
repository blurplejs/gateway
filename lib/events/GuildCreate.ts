import EventType from './EventType'
import { Guild } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-create
export type PayloadType = Guild

export class GuildCreate extends EventType<PayloadType> {

    constructor (protected guild: Guild) {
        super()
    }

    get payload () {
        return this.guild
    }

}
