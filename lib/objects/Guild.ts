import { Snowflake } from '../models'
import { createFakeableDiscordObject, ResolvableDiscordObject } from './AbstractObject'
import * as faker from 'faker'

type Options = {
    id: Snowflake,
    name: string,
    icon?: string,
    splash?: string,
    owner?: boolean,
    owner_id: Snowflake,
    permissions?: number,
    region: string
    afk_channel_id: Snowflake | undefined,
    afk_timeout: number,
    embed_enabled?: boolean,
    embed_channel_id?: Snowflake,
    verification_level: number,
    default_message_notifications: number,
    explicit_content_filter: number,
    //roles: Role[],
    //emojis: Emoji[],
    features: string[],
    mfa_level: number,
    application_id: Snowflake | undefined,
    widget_enabled?: boolean,
    widget_channel_id?: Snowflake,
    system_channel_id: Snowflake | undefined,
    joined_at?: number,
    large?: boolean,
    unavailable?: boolean,
    member_count?: number,
    voice_states?: number[],
    //members?: GuildMember[],
    //channels?: Channel[],
    //presences?: PresenceUpdate[]  
}

function fakeGuildData () {
    return {
        id: Snowflake.create(),
        name: faker.internet.domainWord(),
        owner_id: Snowflake.create(),
        region: faker.random.locale(),
        afk_channel_id: undefined,
        afk_timeout: 900,
        verification_level: 0,
        default_message_notifications: 0,
        explicit_content_filter: 0,
        roles: [],
        emojis: [],
        features: [],
        mfa_level: 0,
        application_id: undefined,
        system_channel_id: undefined
    }
}

export default class Guild
    extends createFakeableDiscordObject<Options>('guild', fakeGuildData)
    implements ResolvableDiscordObject {

}
