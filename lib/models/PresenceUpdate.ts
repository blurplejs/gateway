import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/topics/gateway#presence-update
type PresenceUpdateOptions = {
}

export default class PresenceUpdate extends Fakeable<PresenceUpdateOptions> {

    fake () : PresenceUpdateOptions {
        return {
        }
    }

}
