import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-delete
export type PayloadType = {}

export class MessageDelete extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
