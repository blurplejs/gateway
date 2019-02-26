import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-create
export type PayloadType = {}

export class MessageCreate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
