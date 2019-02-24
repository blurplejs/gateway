import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#voice-state-update
export namespace VoiceStateUpdate {

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
