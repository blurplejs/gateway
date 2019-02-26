import EventType from './EventType'
import { GatewayOpcode } from '../constants'

// @see https://discordapp.com/developers/docs/topics/gateway#hello
export type PayloadType = {
    heartbeat_interval: number,
    _trace: string[]
}

export class Hello extends EventType<PayloadType> {

    opcode = GatewayOpcode.Hello

    constructor (protected heartbeat: number = 45000) {
        super()
    }

    get payload () {
        return {
            heartbeat_interval: this.heartbeat,
            _trace: ["fake-gateway-1-"]
        }
    }

}
