import Fakeable from './models/Fakeable'

export default class Factory {

    constructor (protected number: number) {

    }
    
    create<T> (fakeable: new() => Fakeable<T>) : Fakeable<T>[] {
        let result = []
        for (let i = 0; i < this.number; i++) {
            result.push(new fakeable())
        }
        
        return result
    }
}
