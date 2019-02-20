import * as faker from 'faker'
import Snowflake, { SnowflakeIdentifiable } from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/resources/channel#channel-object
type ChannelOptions = SnowflakeIdentifiable & {
}

export default class Channel extends Fakeable<ChannelOptions> {

    fake () : ChannelOptions {
        return {
            id: Snowflake.create()
        }
    }

}
