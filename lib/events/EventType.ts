export default abstract class EventType<T> {
    public eventName: string

    abstract get payload(): T

    constructor () {
        this.eventName = this.constructor.name.split(/(?=[A-Z])/).join('_').toUpperCase()
    }
}
