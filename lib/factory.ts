import { Model, Proxied } from './models'
import * as faker from 'faker'

export default class Factory<T, P extends Proxied<T>> {

    constructor (protected construct: new(p?: Partial<T>) => P, protected number: number) {

    }
    
    create (each: (fake: typeof faker) => Partial<T> = () => ({})) : P[] {
        let result = []

        for (let i = 0; i < this.number; i++) {
            result.push(new this.construct(each(faker)))
        }
        
        return result
    }

}
