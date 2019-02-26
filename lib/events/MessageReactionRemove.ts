import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-reaction-remove
export type PayloadType = {}

export class MessageReactionRemove extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
