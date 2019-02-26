import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#presence-update
export type PayloadType = {}

export class PresenceUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
