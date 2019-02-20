import { GatewayOpcode, VoiceOpcode } from '../constants'
import { UnknownOpcodeError } from '../errors'

export default class Message {

    constructor (
        public readonly opcode: GatewayOpcode | VoiceOpcode,
        public readonly data: any | null = null,
        public readonly eventName: string | null = null,
        public readonly sequence: number | null = null
    ) { }

    toObject () : object {
        return {
            op: this.opcode,
            d: this.data,
            t: this.eventName,
            s: this.sequence
        }
    }

    static fromPacket (packet: any, voice: boolean = false) : Message {
        let opcodeName = voice ? GatewayOpcode[packet.op] : VoiceOpcode[packet.op]
        if (!opcodeName) {
            throw new UnknownOpcodeError()
        }
        
        return new Message(
            voice ? packet.op as VoiceOpcode : packet.op as GatewayOpcode,
            packet.d,
            packet.t,
            packet.s
        )
    }

}
