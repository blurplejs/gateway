import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-reaction-remove-all
export type PayloadType = {}

export class MessageReactionRemoveAll extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
