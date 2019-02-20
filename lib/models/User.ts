import * as faker from 'faker'
import Snowflake from './Snowflake'
import Fakeable from './Fakeable'

// @see https://discordapp.com/developers/docs/resources/user#user-object
type UserOptions = {
    id: Snowflake,
    username: string,
    discriminator: string,
    avatar?: string,
    bot?: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: boolean,
    email?: string,
    flags: number,
    premium_type?: number
}

export default class User extends Fakeable<UserOptions> {

    fake () : UserOptions {
        return {
            id: Snowflake.create(),
            username: faker.internet.userName(),
            discriminator: faker.random.number({ min: 1000, max: 9999 }).toString(),
            flags: 0
        }
    }

}
