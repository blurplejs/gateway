import { FakeableDiscordObjectConstructor } from './AbstractObject'
import Guild from './Guild'
import User from './User'
import Channel from './Channel'
import Role from './Role'

// Export all fakeable object types in a convenient map from their name to their constructor
export const FakeableObjectTypes: { [x: string]: FakeableDiscordObjectConstructor<any> } = {
    [Guild.objectTypeName]: Guild,
    [User.objectTypeName]: User,
    [Channel.objectTypeName]: Channel,
    [Role.objectTypeName]: Role,
}

// Export all object types
export { default as Guild } from './Guild'
export { default as User } from './User'
export { default as Channel } from './Channel'
export { default as UnavailableGuild } from './UnavailableGuild'
export { default as Snowflake } from './Snowflake'
export { default as Role } from './Role'
