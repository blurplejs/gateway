import EventType from './EventType'
import Guild from '../objects/Guild'

export namespace GuildCreate {

    export type PayloadType = Guild

    export class Event extends EventType<PayloadType> {

        constructor (protected guild: Guild) {
            super()
        }

        get payload () {
            return this.guild
        }
    
    }

}
