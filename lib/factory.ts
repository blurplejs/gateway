import * as faker from 'faker'

/**
 * Takes all keys in T and returns those that aren't functions
 */
type Properties<T> = Pick<T, {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K
}[keyof T]>

export default class Factory<T> {

    constructor (protected construct: new(p?: Partial<Properties<T>>) => T, protected number: number) {

    }
    
    create (each: (fake: typeof faker) => Partial<Properties<T>> = () => ({})) : T[] {
        let result = []

        for (let i = 0; i < this.number; i++) {
            result.push(new this.construct(each(faker)))
        }
        
        return result
    }

}
