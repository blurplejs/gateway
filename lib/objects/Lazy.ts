import { AbstractDiscordObject } from './AbstractObject'
import Snowflake from './Snowflake'
import storage from '../storage'

export default class Lazy extends AbstractDiscordObject {

    protected snowflake: string

    constructor (snowflake: string | Snowflake) {
        super()
        this.snowflake = typeof snowflake === 'string' ? snowflake : snowflake.toString()
    }

    forMessage () {
        return null
        // storage.find(this.snowflake)
    }
}
