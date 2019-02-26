import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-update
export type PayloadType = {}

export class MessageUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
