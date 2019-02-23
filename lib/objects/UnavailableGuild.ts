import { createDiscordObject } from './AbstractObject'
import Snowflake from './Snowflake'
import Guild from './Guild'
    
type Options = {
    id: Snowflake,
    unavailable: boolean
}

export default class UnavailableGuild extends createDiscordObject<Options>('unavailableGuild') {

    constructor (guild: Guild) {
        super({ id: guild.id, unavailable: true })
    }

}
