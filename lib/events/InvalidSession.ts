import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#invalid-session
export type PayloadType = boolean

export class InvalidSession extends EventType<PayloadType> {

    constructor (protected resumable: boolean = true) {
        super()
    }

    get payload () {
        return this.resumable
    }

}
