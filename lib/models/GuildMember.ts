import Snowflake from './Snowflake'
import Model from './Model'

// @see https://discordapp.com/developers/docs/resources/guild#guild-member-object
type GuildMemberOptions = {
}

export default class GuildMember extends Model<GuildMemberOptions>(() => ({})) {

}

