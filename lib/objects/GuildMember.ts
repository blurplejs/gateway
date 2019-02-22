import { createDiscordObject } from './AbstractObject'
import Snowflake from './Snowflake'

type Options = {
}

export default class GuildMember extends createDiscordObject<Options>('guildMember') {

}
