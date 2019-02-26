import EventType from './EventType'
import { Snowflake } from '../objects'

// @see https://discordapp.com/developers/docs/topics/gateway#webhooks-update
export type PayloadType = {
    guild_id: Snowflake,
    channel_id: Snowflake
}

export class WebhooksUpdate extends EventType<PayloadType> {

    constructor (protected guildID: Snowflake, protected channelID: Snowflake) {
        super()
    }

    get payload () {
        return {
            guild_id: this.guildID,
            channel_id: this.channelID
        }
    }

}
