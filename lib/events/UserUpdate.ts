import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#user-update
export type PayloadType = {}

export class UserUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
