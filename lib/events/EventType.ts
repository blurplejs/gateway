import { GatewayOpcode } from '../constants'

export default abstract class EventType<T> {
    public eventName: string

    public opcode: GatewayOpcode = GatewayOpcode.Dispatch

    abstract get payload(): T

    constructor () {
        this.eventName = this.constructor.name.split(/(?=[A-Z])/).join('_').toUpperCase()
    }
}
