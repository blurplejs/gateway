import * as faker from 'faker'

type HasSymbol = {
    _symbol: string
}

export type Proxied<T> = Pick<T, keyof T> & HasSymbol

export default function Model<T>(name: string, defaults: (fake: typeof faker) => T) : new(data?: Partial<T>) => Proxied<T> {
    return class {
        public _symbol = name

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
