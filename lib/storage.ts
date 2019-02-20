import * as faker from 'faker'
import Factory from './factory'
import User from './models/User'
import Fakeable from './models/Fakeable'

class Storage {

    constructor () {
        this.fake()
    }

    fake () : void {
        // let users = this.factory(User, 20).create()
        // console.log(users)
    }

    factory<T> (fakeable: new() => Fakeable<T>, number: number) : Factory<T> {
        return new Factory(fakeable, number)
    }
    
    // There are ...
    // - Guilds
    // - Users
    // - Channels
    // - Roles
    // - Messages
}

export default new Storage()
