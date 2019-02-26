import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#voice-server-update
export type PayloadType = {}

export class VoiceServerUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
