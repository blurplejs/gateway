import { createDiscordObject } from './AbstractObject'
import Snowflake from './Snowflake'
import Guild from './Guild'

type Options = {
    guild: Snowflake,
    unavailable: boolean
}

export default class UnavailableGuild extends createDiscordObject<Options>('unavailableGuild') {

    constructor (guild: Guild) {
        super({ guild: guild.id, unavailable: true })
    }

}
