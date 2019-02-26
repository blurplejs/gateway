import EventType from './EventType'

// @see https://discordapp.com/developers/docs/topics/gateway#guild-integrations-update
export type PayloadType = {}

export class GuildIntegrationsUpdate extends EventType<PayloadType> {

    constructor () {
        super()
    }

    get payload () {
        return {}
    }

}
