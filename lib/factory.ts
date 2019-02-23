import * as faker from 'faker'
import { DiscordObject, ResolvableDiscordObject } from './objects/AbstractObject'
import storage from './storage'

type OptionType<T extends DiscordObject<T>> = T extends DiscordObject<infer U> ? U : never

function isResolvable<T> (object: DiscordObject<T>) : object is ResolvableDiscordObject<T> {
    return object.hasOwnProperty('id')
}

export default class Factory<T extends DiscordObject<any>> {

    protected resolvable: boolean | undefined

    constructor (
        protected construct: new(data: Partial<OptionType<T>>) => T,
        protected number: number
    ) {

    }

    create (each: (fake: typeof faker) => Partial<OptionType<T>> = () => ({})) : T[] {
        let result = []
        let resolvable = []
        for (let i = 0; i < this.number; i++) {
            let created = new this.construct(each(faker))

            if (created.id) resolvable.push(created)
            result.push(created)
        }
        
        storage.insert(resolvable as ResolvableDiscordObject<any>[])
        return result
    }

}
