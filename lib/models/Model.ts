import * as faker from 'faker'

type HasSymbol = {
    _symbol: string
}

export type Proxied<T> = Pick<T, keyof T> & HasSymbol

export default function Model<T>(name: string, defaults: (fake: typeof faker) => T) : new(data?: Partial<T>) => Proxied<T> {
    return class {
        public _symbol = name

        public readonly _options: T

        constructor (options: Partial<T>) {
            this._options = { ...defaults(faker), ...options }
            return new Proxy(this, {
                get (target, prop: keyof T) {
                    // @ts-ignore
                    if (target[prop]) return target[prop]
                    return target._options[prop]
                }
            })
        }
    } as any
}
