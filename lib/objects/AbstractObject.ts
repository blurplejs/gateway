import Snowflake from './Snowflake'

export interface ResolvableDiscordObject {
    id: Snowflake
}

export type DiscordObject<OptionType> = Pick<OptionType, keyof OptionType> & {
    forMessage (): OptionType,
    _objectTypeName: string
}

export abstract class AbstractDiscordObject {
    abstract forMessage (): any
}

export interface DiscordObjectConstructor<T>{
    new (options: T): DiscordObject<T>
    prototype: DiscordObject<T>
    objectTypeName: string
}

export interface FakeableDiscordObjectConstructor<T> extends DiscordObjectConstructor<T> {
    new (options?: Partial<T>): DiscordObject<T>
}

export function createDiscordObject<T> (name: string) : DiscordObjectConstructor<T> {
    return class extends AbstractDiscordObject {
        static objectTypeName = name

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

export function createFakeableDiscordObject<T> (name: string, fake: () => T) : FakeableDiscordObjectConstructor<T> {
    return class extends createDiscordObject(name) {
        constructor (options: Partial<T>) {
            super({ ...fake(), ...options })
        }
    } as any
}
