import Snowflake from './Snowflake'
import { createFakeableDiscordObject } from './AbstractObject'
import * as faker from 'faker'

// @see https://discordapp.com/developers/docs/resources/user#user-object
type Options = {
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
    premium_type?: number,
    '@api_token'?: string
}

function fakeUserData () {
    return {
        id: Snowflake.create(),
        username: faker.internet.userName(),
        discriminator: faker.random.number({ min: 1000, max: 9999 }).toString(),
        flags: 0
    }
}

export default class User extends createFakeableDiscordObject<Options>('user', fakeUserData) {

}
