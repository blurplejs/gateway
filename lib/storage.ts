import * as faker from 'faker'
import Factory from './factory'
import { FakeableObjectTypes, User, Guild, Channel } from './objects'
import Snowflake, { SnowflakeIdentifiable } from './models/Snowflake'
import { EventEmitter } from 'events'
import { AbstractDiscordObject, DiscordObject } from './objects/AbstractObject'

class Storage extends EventEmitter {

    protected objectStorage: { [K: string]: DiscordObject<any> } = {}

    empty () : this {
        this.objectStorage = {}
        return this
    }

    /**
     * Seeds the storage with demo data. Any previously seeded data will be discarded
     * 
     * @param seed number? The seed to use for when you need deterministic results
     * @returns this
     */
    seed (seed?: number) : this {
        // If seed is not set, set an actual random seed
        faker.seed(typeof seed == 'number' ? seed : Math.floor(Math.random() * 10000))

        this.empty()
        Snowflake.reset()

        this.factory('user', 30).create()
        this.factory('guild', 20).create()
        this.factory('channel', 50).create()

        return this
    }

    factory (string: 'user', number: number) : Factory<User>
    factory (string: 'guild', number: number) : Factory<Guild>
    factory (string: 'channel', number: number) : Factory<Channel>
    factory<T extends DiscordObject<any>> (name: string, number: number = 1) : Factory<T> {
        if (!FakeableObjectTypes[name]) throw new Error(`${name} is not a fakeable object and cannot instantiate a factory`)

        return new Factory(FakeableObjectTypes[name], number)
    }

    random (name: string) : DiscordObject<any> | null {
        let snowflakes = Object.keys(this.objectStorage).filter((snowflake) => this.objectStorage[snowflake]._objectTypeName === name)
        if (!snowflakes.length) return null

        return this.objectStorage[faker.random.arrayElement(snowflakes)]
    }

}

export default new Storage()
