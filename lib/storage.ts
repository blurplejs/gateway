import * as faker from 'faker'
import Factory from './factory'
import { FakeableObjectTypes, User, Guild, Channel, Snowflake } from './objects'
import { EventEmitter } from 'events'
import { ResolvableDiscordObject, DiscordObject } from './objects/AbstractObject'

class Storage extends EventEmitter {

    protected objectStorage: { [K: string]: ResolvableDiscordObject<any> } = {}

    protected objectsOfType (type: string) : DiscordObject<any>[] {
        return Object.keys(this.objectStorage)
            .filter((snowflake) => this.objectStorage[snowflake]._objectTypeName === type)
            .map((snowflake) => this.objectStorage[snowflake])
    }

    empty () : this {
        this.objectStorage = {}
        return this
    }

    insert (objects: ResolvableDiscordObject<any> | ResolvableDiscordObject<any>[]) {
        if (!Array.isArray(objects)) objects = [objects]

        objects.forEach((object) => {
            this.objectStorage[object.id.toString()] = object
            this.emit(`${object._objectTypeName}Created`, object)
        })
    }

    find (id: Snowflake | string) : DiscordObject<any> | null {
        if (id instanceof Snowflake) id = id.toString()
        let object = this.objectStorage[id]

        return object ? object : null
    }

    get users () : User[] {
        return this.objectsOfType('user') as User[]
    }

    get guilds () : Guild[] {
        return this.objectsOfType('guild') as Guild[]
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

    factory (string: 'user', number?: number) : Factory<User>
    factory (string: 'guild', number?: number) : Factory<Guild>
    factory (string: 'channel', number?: number) : Factory<Channel>
    factory<T extends DiscordObject<any>> (name: string, number: number = 1) : Factory<T> {
        if (!FakeableObjectTypes[name]) throw new Error(`${name} is not a fakeable object and cannot instantiate a factory`)

        return new Factory(FakeableObjectTypes[name], number)
    }

    random (name: 'user') : User | null
    random (name: 'guild') : Guild | null
    random (name: string) : DiscordObject<any> | null {
        let objects = this.objectsOfType(name)
        if (!objects.length) return null

        return faker.random.arrayElement(objects)
    }

}

export default new Storage()
