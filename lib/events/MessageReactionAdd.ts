import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-reaction-add
export type PayloadType = {}

export class MessageReactionAdd extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
