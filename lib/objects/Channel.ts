import Snowflake from './Snowflake'
import User from './User'
import { createFakeableDiscordObject } from './AbstractObject'
import * as faker from 'faker'

export enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4
}

// @see https://discordapp.com/developers/docs/resources/channel#channel-object
type Options = {
    id: Snowflake,
    type: ChannelType,
    guild_id?: Snowflake,
    position?: number,
    // permission_overwrites?: Overwrite[],
    name?: string,
    topic?: string | null,
    nsfw?: boolean,
    last_message_id?: Snowflake | null,
    bitrate?: number,
    user_limit?: number,
    rate_limit_per_user?: number,
    recipients?: User[],
    icon?: string | null,
    owner_id?: Snowflake,
    application_id?: Snowflake,
    parent_id?: Snowflake | null,
    last_pin_timestamp?: number
}

function fakeChannelData () {
    return {
        id: Snowflake.create(),
        type: ChannelType.GUILD_TEXT,
    }
}

export default class Channel extends createFakeableDiscordObject<Options>('channel', fakeChannelData) {

}
