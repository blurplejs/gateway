import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#voice-state-update
export type PayloadType = {}

export class VoiceStateUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
