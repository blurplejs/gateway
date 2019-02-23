import Snowflake from './Snowflake'

export type DiscordObject<OptionType> = Pick<OptionType, keyof OptionType> & {
    forMessage (): OptionType,
    _objectTypeName: string
}

export type ResolvableDiscordObject<OptionType> = DiscordObject<OptionType> & {
    id: Snowflake
}

export abstract class AbstractDiscordObject {
    abstract forMessage (): any
}

export interface DiscordObjectConstructor<T> {
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
        _objectTypeName = name

        constructor (protected options: T) {
            super()
            return new Proxy(this, {
                get (target, type) {
                    // @ts-ignore
                    return type in target ? target[type] : target.options[type]
                }
            })
        }

        forMessage () {
            return this.options
        }
    } as any
}

export function createFakeableDiscordObject<T> (name: string, fake: (options: Partial<T>) => T) : FakeableDiscordObjectConstructor<T> {
    return class extends createDiscordObject(name) {
        constructor (options: Partial<T> = {}) {
            super({ ...fake(options), ...options })
        }
    } as any
}
