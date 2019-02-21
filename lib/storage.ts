import * as faker from 'faker'
import Factory from './factory'
import { Model, Proxied, Guild, Channel, User } from './models'
import Snowflake, { SnowflakeIdentifiable } from './models/Snowflake'

class Storage {

    static supportedModels: string[] = [
        'user',
        'guild',
        'channel',
    ]

    protected store: { [K: string]: Proxied<any>[] } = {}

    get users () : Proxied<User>[] {
        return this.store['user'] || []
    }

    set users (users: Proxied<User>[]) {
        this.store['user'] = users
    }

    get guilds () : Proxied<Guild>[] {
        return this.store['guild'] || []
    }

    set guilds (users: Proxied<Guild>[]) {
        this.store['guild'] = users
    }

    get channels () : Proxied<Channel>[] {
        return this.store['channel'] || []
    }

    set channels (users: Proxied<Channel>[]) {
        this.store['channel'] = users
    }

    /**
     * Seeds the storage with demo data. Any previously seeded data will be discarded
     * 
     * @param seed number? The seed to use for when you need deterministic results
     * @returns this
     */
    seed (seed?: number) : this {
        if (seed) {
            faker.seed(seed)
        }

        Snowflake.reset()

        this.users = this.factory(User, 30).create()
        this.guilds = this.factory(Guild, 20).create()
        this.channels = this.factory(Channel, 50).create()

        return this
    }

    factory<T> (Model: new() => T, number: number = 1) : Factory<T> {
        return new Factory(Model, number)
    }

    random (type: string) : Proxied<SnowflakeIdentifiable> | null {
        if (!Storage.supportedModels.includes(type)) {
            throw new Error(`${type} not supported.`)
        }

        let list = this.store[type]
        if (!list) return null
        
        return faker.random.arrayElement(list)
    }

}

export default new Storage()
