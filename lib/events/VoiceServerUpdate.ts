import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#voice-server-update
export namespace VoiceServerUpdate {

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
