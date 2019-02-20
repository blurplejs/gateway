import * as faker from 'faker'
import Snowflake, { SnowflakeIdentifiable } from './Snowflake'
import Model from './Model'

// @see https://discordapp.com/developers/docs/resources/channel#channel-object
type ChannelOptions = SnowflakeIdentifiable & {
}

export default class Channel extends Model<ChannelOptions> {

    fake () : ChannelOptions {
        return {
            id: Snowflake.create()
        }
    }

}
