import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#typing-start
export type PayloadType = {}

export class TypingStart extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
