import * as faker from 'faker'
import { Proxied } from './models'

/**
 * Takes all keys in T and returns those that aren't functions
 */
type Properties<T> = Pick<T, {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K
}[keyof T]>

export default class Factory<T> {

    constructor (
        protected construct: new(p?: Partial<Properties<T>>) => T,
        protected number: number,
        protected createdHook?: (created: Proxied<T>) => void
    ) {
    }
    
    create (each: (fake: typeof faker) => Partial<Properties<T>> = () => ({})) : T[] {
        let result = []

        for (let i = 0; i < this.number; i++) {
            let created = new this.construct(each(faker))

            result.push(created)
            if (this.createdHook) this.createdHook(created as any)
        }
        
        return result
    }

}
