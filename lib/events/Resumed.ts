import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#resumed
export type PayloadType = {
    _trace: string[]
}

export class Resumed extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {
            _trace: ['fake-gateway-1']
        }
    }

}
