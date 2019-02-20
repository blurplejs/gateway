import * as faker from 'faker'
import Factory from './factory'
import User from './models/User'
import Model from './models/Model'
import Channel from './models/Channel'
import Guild from './models/Guild'
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

    factory<T> (Model: new() => Model<T>, number: number = 1) : Factory<T> {
        return new Factory(Model, number)
    }

    random (type: 'user' | 'guild' | 'channel') : Model<SnowflakeIdentifiable> {
        let attribute = {
            user: 'users',
            guild: 'guilds',
            channel: 'channels'
        }[type] as keyof Storage

        return faker.random.arrayElement(this[attribute] as Model<SnowflakeIdentifiable>[])
    }

}

export default new Storage()
