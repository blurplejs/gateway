import Snowflake, { SnowflakeIdentifiable } from './Snowflake'
import Model from './Model'

// @see https://discordapp.com/developers/docs/resources/channel#channel-object
export type ChannelOptions = SnowflakeIdentifiable & {
}

export default class extends Model<ChannelOptions>(
    'channel',
    (faker) => ({
        id: Snowflake.create()
    })
) {

}
