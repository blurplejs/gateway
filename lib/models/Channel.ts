import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/resources/channel#channel-object
type ChannelOptions = {
}

export default class Channel extends Fakeable<ChannelOptions> {

    fake () : ChannelOptions {
        return {
        }
    }

}
