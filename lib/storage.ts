import * as faker from 'faker'
import Factory from './factory'
import User from './models/User'

export default class Storage {

    constructor () {
        this.fake()
    }

    fake () : void {
        let users = this.repeat(10).create(User)
        console.log(users)
    }

    repeat (number: number) : Factory {
        return new Factory(number)
    }
    
    
    // There are ...
    // - Guilds
    // - Users
    // - Channels
    // - Roles
    // - Messages
}
