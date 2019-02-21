import * as faker from 'faker'
import Factory from './factory'
import { Model, Proxied, Guild, Channel, User } from './models'
import Snowflake, { SnowflakeIdentifiable } from './models/Snowflake'
import { EventEmitter } from 'events'

interface StorageEvents {
    on(event: 'guildCreated', listener: (guild: Guild) => void) : this
}

class Storage extends EventEmitter implements StorageEvents {

    static supportedModels: string[] = [
        'user',
        'guild',
        'channel',
    ]

    protected objects: { [K: string]: Proxied<any>[] } = {}

    get users () : Proxied<User>[] {
        return this.objects['user'] || []
    }

    get guilds () : Proxied<Guild>[] {
        return this.objects['guild'] || []
    }

    get channels () : Proxied<Channel>[] {
        return this.objects['channel'] || []
    }

    empty () : this {
        this.objects = {}
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

        this.factory(User, 30).create()
        this.factory(Guild, 20).create()
        this.factory(Channel, 50).create()

        return this
    }

    store<T> (model: Proxied<T>) : this {
        if (!this.objects[model._symbol]) this.objects[model._symbol] = []
        this.objects[model._symbol].push(model)

        this.emit(`${model._symbol}Created`, model)

        return this
    }

    factory<T> (Model: new() => T, number: number = 1) : Factory<T> {
        return new Factory(Model, number, this.store.bind(this))
    }

    random (type: string) : Proxied<SnowflakeIdentifiable> | null {
        if (!Storage.supportedModels.includes(type)) {
            throw new Error(`${type} not supported.`)
        }

        let list = this.objects[type]
        if (!list) return null
        
        return faker.random.arrayElement(list)
    }

}

export default new Storage()
