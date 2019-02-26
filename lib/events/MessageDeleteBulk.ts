import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#message-delete-bulk
export type PayloadType = {}

export class MessageDeleteBulk extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
