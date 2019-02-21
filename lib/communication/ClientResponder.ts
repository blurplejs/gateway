import * as WebSocket from 'ws'
import MessageEncoder, { Encoding } from './MessageEncoder'
import { GatewayOpcode, GatewayCloseEventCode } from '../constants'
import Message from './Message'
import { AuthenticationFailedError, isWebsocketError } from '../errors'
import storage from '../storage'

export default class ClientResponder {

    constructor (
        protected socket: WebSocket,
        protected clientAttributes: any,
        protected encoding: Encoding = Encoding.JSON
    ) { }

    protected send (message: Message) : void {
        return this.socket.send(MessageEncoder.encode(message, this.encoding))
    }

    attachListeners () : void {
        this.socket.on('message', async (buffer) => {
            try {
                let decodedPayload = MessageEncoder.decode(buffer, this.encoding)
                let message = Message.fromPacket(decodedPayload)

                let handler = ClientResponder.listenerMap[message.opcode as GatewayOpcode]
                if (!handler) return
                
                let response = await this[handler](message)
                if (response) {
                    this.send(response)
                }
            } catch (e) {
                this.socket.close(isWebsocketError(e) ? e.code : GatewayCloseEventCode.UnknownError)
            }
        })

        this.attachStorageListeners()
    }

    protected attachStorageListeners () : void {
        
    }

    sendHello () : void {
        let hello = new Message(GatewayOpcode.Hello, {
            heartbeat_interval: 45000,
            _trace: ['discord-fake-gateway-01']
        })

        this.send(hello)
    }

    protected static listenerMap : { [K in GatewayOpcode]?: keyof ClientResponder } = {
        [GatewayOpcode.Heartbeat]: 'heartbeat',
        [GatewayOpcode.Identify]: 'identify',
        [GatewayOpcode.StatusUpdate]: 'statusUpdate',
        [GatewayOpcode.VoiceStateUpdate]: 'voiceStateUpdate',
        [GatewayOpcode.Resume]: 'resume',
        [GatewayOpcode.RequestGuildMembers]: 'requestGuildMembers'
    }

    heartbeat (request: Message) : Message | void {
        return new Message(GatewayOpcode.HeartbeatAck)
    }

    identify (request: Message) : Message | void {
        if (!request.data.token) throw new AuthenticationFailedError()
        
        let user = storage.users.find((user) => user['@api_token'] == request.data.token)
        if (!user) throw new AuthenticationFailedError()

        let response = new Message(GatewayOpcode.Dispatch, {
            v: this.clientAttributes.v || 6,
            _trace: [],
            user_settings: {},
            guilds: [],
            private_channels: [],
            relationships: [],
            user: {
                verified: true,
                username: user.username,
                // ...
            }
        }, 'READY', 1)

        return response
    }

    statusUpdate (request: Message) : Message | void {
        console.log('statusUpdate', request)
    }

    voiceStateUpdate (request: Message) : Message | void {
        console.log('voiceStateUpdate', request)
    }

    resume (request: Message) : Message | void {
        console.log('resume', request)
    }

    requestGuildMembers (request: Message) : Message | void {
        console.log('requestGuildMembers', request)
    }
}
