import Fakeable from './models/Fakeable'

export default class Factory<T> {

    constructor (protected fakeable: new(p?: Partial<T>) => Fakeable<T>, protected number: number) {

    }
    
    create (each: () => Partial<T> = () => ({})) : Fakeable<T>[] {
        let result = []
        for (let i = 0; i < this.number; i++) {
            result.push(new this.fakeable(each()))
        }
        
        return result
    }

}
