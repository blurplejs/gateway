import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

type GuildOptions = {

}

export default class Guild extends Fakeable<GuildOptions> {

    fake() : GuildOptions {
        return {}
    }
    
}
