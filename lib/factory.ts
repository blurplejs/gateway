import * as faker from 'faker'
import { DiscordObject } from './objects/AbstractObject'

type OptionType<T extends DiscordObject<T>> = T extends DiscordObject<infer U> ? U : never

export default class Factory<T extends DiscordObject<any>> {

    constructor (protected construct: new(data: Partial<OptionType<T>>) => T, protected number: number) {

    }

    create (each: (fake: typeof faker) => Partial<OptionType<T>> = () => ({})) : T[] {
        let result = []
        for (let i = 0; i < this.number; i++) {
            let created = new this.construct(each(faker))

            result.push(created)
        }
        
        return result
    }

}
