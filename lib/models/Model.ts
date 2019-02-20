import * as faker from 'faker'

export type Proxied<T> = Pick<T, keyof T>

export default function Model<T>(defaults: (fake: typeof faker) => T) : new() => Proxied<T> {
    return class {
        protected options: T

        constructor (options: Partial<T>) {
            this.options = { ...defaults(faker), ...options }
            return new Proxy(this, {
                get (target, prop: keyof T) {
                    return target.options[prop]
                }
            })
        }
    } as any
}
