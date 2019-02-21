import Snowflake, { SnowflakeIdentifiable } from './Snowflake'
import Model from './Model'

// @see https://discordapp.com/developers/docs/resources/user#user-object
export type UserOptions = SnowflakeIdentifiable & {
    username: string,
    discriminator: string,
    avatar?: string,
    bot?: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: boolean,
    email?: string,
    flags: number,
    premium_type?: number,
    '@api_token'?: string
}

export default class User extends Model<UserOptions>(
    'user',
    (faker) => ({
        id: Snowflake.create(),
        username: faker.internet.userName(),
        discriminator: faker.random.number({ min: 1000, max: 9999 }).toString(),
        flags: 0
    })
) {

}
