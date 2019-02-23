import { createDiscordObject, createFakeableDiscordObject } from './AbstractObject'
import Snowflake from './Snowflake'
import User from './User'
import * as faker from 'faker'

// @see https://discordapp.com/developers/docs/resources/emoji#emoji-object
type Options = {
    id: Snowflake | null,
    name: string,
    roles?: Snowflake[],
    user?: User,
    require_colons?: boolean,
    managed?: boolean,
    animated?: boolean
}

function fakeEmojiData () {
    return {
        id: faker.random.boolean() ? Snowflake.create() : null,
        name: faker.lorem.word()
    }
}

export default class Emoji extends createFakeableDiscordObject<Options>('emoji', fakeEmojiData) {

}
