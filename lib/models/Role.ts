import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/topics/permissions#role-object
type RoleOptions = {
}

export default class Role extends Fakeable<RoleOptions> {

    fake () : RoleOptions {
        return {
        }
    }

}
