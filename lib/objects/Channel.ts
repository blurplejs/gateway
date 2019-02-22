import Snowflake from './Snowflake'
import { createFakeableDiscordObject, ResolvableDiscordObject } from './AbstractObject'
import * as faker from 'faker'

// @see https://discordapp.com/developers/docs/resources/channel#channel-object
type Options = {
    id: Snowflake
}

function fakeChannelData () {
    return {
        id: Snowflake.create()
    }
}

export default class Channel extends createFakeableDiscordObject<Options>('channel', fakeChannelData) {

}
