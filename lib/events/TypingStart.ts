import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#typing-start
export namespace TypingStart {

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
