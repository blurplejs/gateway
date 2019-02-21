import { Snowflake } from "../models"

export interface ResolvableDiscordObject {
    id: Snowflake
}

export abstract class AbstractDiscordObject {
    abstract forMessage (): any
}

export type DiscordObject<T> = Pick<T, keyof T> & {
    forMessage (): T,
    _objectTypeName: string
}

export function createDiscordObject<T> (name: string) : new(options: T) => DiscordObject<T> {
    return class extends AbstractDiscordObject {
        constructor (protected options: T) {
            super()
            return new Proxy(this, {
                get (target, prop: keyof T | '_objectTypeName') {
                    if (prop === '_objectTypeName') return name
                    return target.options[prop]
                }
            })
        }

        forMessage () {
            return this.options
        }
    } as any
}

export function createFakeableDiscordObject<T> (name: string, fake: () => T) : new() => DiscordObject<T> {
    return class extends createDiscordObject(name) {
        constructor (options: Partial<T>) {
            super({ ...fake(), ...options })
        }
    } as any
}
