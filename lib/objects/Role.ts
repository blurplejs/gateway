import { createFakeableDiscordObject } from './AbstractObject'
import Snowflake from './Snowflake'
import * as faker from 'faker'

// @see https://discordapp.com/developers/docs/topics/permissions#role-object
type Options = {
    id: Snowflake,
    name: string,
    color: number,
    hoist: boolean,
    position: number,
    permissions: number,
    managed: boolean,
    mentionable: boolean
}

function fakeRoleData () {
    return {
        id: Snowflake.create(),
        name: faker.lorem.words(3),
        color: parseInt(faker.internet.color().replace('#', ''), 16),
        hoist: faker.random.boolean(),
        position: faker.random.number(),
        permissions: faker.random.number(),
        managed: faker.random.boolean(),
        mentionable: faker.random.boolean()
    }
}

export default class Role extends createFakeableDiscordObject<Options>('role', fakeRoleData) {

    

}
