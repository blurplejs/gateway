import * as faker from 'faker'
import Snowflake from './Snowflake'
import Model from './Model'

// @see https://discordapp.com/developers/docs/topics/gateway#presence-update
type PresenceUpdateOptions = {
}

export default class PresenceUpdate extends Model<PresenceUpdateOptions> {

    fake () : PresenceUpdateOptions {
        return {
        }
    }

}
