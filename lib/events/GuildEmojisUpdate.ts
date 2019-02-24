import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-emojis-update
export namespace GuildEmojisUpdate {

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
