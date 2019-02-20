export default abstract class Fakeable<T> {

    public options: T

    constructor (options?: Partial<T>) {
        this.options = { ...this.fake(), ...options }
    }

    abstract fake () : T
    
}
