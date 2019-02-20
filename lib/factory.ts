import Fakeable from './models/Fakeable'
import * as faker from 'faker'

export default class Factory<T> {

    constructor (protected fakeable: new(p?: Partial<T>) => Fakeable<T>, protected number: number) {

    }
    
    create (each: (fake: typeof faker) => Partial<T> = () => ({})) : Fakeable<T>[] {
        let result = []

        for (let i = 0; i < this.number; i++) {
            result.push(new this.fakeable(each(faker)))
        }
        
        return result
    }

}
