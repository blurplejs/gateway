import * as faker from 'faker'
import { DiscordObject, ResolvableDiscordObject } from './objects/AbstractObject'

type OptionType<T extends DiscordObject<T>> = T extends DiscordObject<infer U> ? U : never

function isResolvable<T> (object: DiscordObject<T>) : object is ResolvableDiscordObject<T> {
    return object.hasOwnProperty('id')
}

export default class Factory<T extends DiscordObject<any>> {

    protected resolvable: boolean | undefined

    constructor (
        protected construct: new(data: Partial<OptionType<T>>) => T,
        protected number: number,
        protected afterHook?: (created: ResolvableDiscordObject<OptionType<T>>[]) => void
    ) {

    }

    create (each: (fake: typeof faker) => Partial<OptionType<T>> = () => ({})) : T[] {
        let result = []
        let resolvable = false
        for (let i = 0; i < this.number; i++) {
            let created = new this.construct(each(faker))
            if (typeof this.resolvable === 'undefined') this.resolvable = isResolvable(created) 

            result.push(created)
        }
        
        if (this.afterHook) this.afterHook(result as ResolvableDiscordObject<any>[])
        return result
    }

}
