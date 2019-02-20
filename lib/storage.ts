import * as faker from 'faker'
import Factory from './factory'
import { Proxied, Guild, Channel, User } from './models'
import Snowflake, { SnowflakeIdentifiable } from './models/Snowflake'

class Storage {

    public users: User[] = []
    public guilds: Guild[] = []
    public channels: Channel[] = []

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

    factory<P, T extends Proxied<P>> (Model: new() => T, number: number = 1) : Factory<P, T> {
        return new Factory(Model, number)
    }

    random (type: 'user' | 'guild' | 'channel') : Proxied<SnowflakeIdentifiable> {
        let attribute = {
            user: 'users',
            guild: 'guilds',
            channel: 'channels'
        }[type] as keyof Storage

        return faker.random.arrayElement(this[attribute] as Proxied<SnowflakeIdentifiable>[])
    }

}

export default new Storage()
