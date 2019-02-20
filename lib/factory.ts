import Model from './models/Model'
import * as faker from 'faker'

export default class Factory<T> {

    constructor (protected Model: new(p?: Partial<T>) => Model<T>, protected number: number) {

    }
    
    create (each: (fake: typeof faker) => Partial<T> = () => ({})) : Model<T>[] {
        let result = []

        for (let i = 0; i < this.number; i++) {
            result.push(new this.Model(each(faker)))
        }
        
        return result
    }

}
