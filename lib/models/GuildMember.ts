import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/resources/guild#guild-member-object
type GuildMemberOptions = {
}

export default class GuildMember extends Fakeable<GuildMemberOptions> {

    fake () : GuildMemberOptions {
        return {
        }
    }

}
