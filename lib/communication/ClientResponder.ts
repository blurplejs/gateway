import * as WebSocket from 'ws'
import { encode, decode, Encoding } from './Encoder'
import { GatewayOpcode, GatewayCloseEventCode, VoiceOpcode } from '../constants'
import Message from './Message'
import { AuthenticationFailedError, isWebsocketError } from '../errors'
import storage from '../storage'
import { Guild, UnavailableGuild } from '../objects'

export default class ClientResponder {

    protected sequence = 0

    constructor (
        protected socket: WebSocket,
        protected clientAttributes: any,
        protected encoding: Encoding = Encoding.JSON
    ) { }

    attachListeners () : void {
        this.socket.on('message', async (buffer) => {
            try {
                let decodedPayload = decode(buffer, this.encoding)
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

    protected send (message: Message) : void {
        if (this.socket.readyState !== WebSocket.OPEN) return
        return this.socket.send(encode(message, this.encoding))
    }

    protected createMessage (opcode: GatewayOpcode | VoiceOpcode, data?: any, eventName?: any) : Message {
        return new Message(opcode, data, eventName, this.sequence++)
    }

    protected attachStorageListeners () : void {
        storage.on('guildCreated', (guild: Guild) => {
            let message = new Message(GatewayOpcode.Dispatch, guild, 'GUILD_CREATE')
            this.send(message)
        })
    }

    protected queue (delay: number, message: Message) : this {
        setTimeout(() => this.send(message), delay)

        return this
    }

    sendHello () : void {
        let hello = this.createMessage(GatewayOpcode.Hello, {
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

    heartbeat () {
        return this.createMessage(GatewayOpcode.HeartbeatAck)
    }

    identify (request: Message) {
        if (!request.data.token) throw new AuthenticationFailedError()
        
        let user = storage.users.find((user) => user['@api_token'] == request.data.token)
        if (!user) throw new AuthenticationFailedError()

        let guilds = storage.guilds

        let response = this.createMessage(GatewayOpcode.Dispatch, {
            v: this.clientAttributes.v || 6,
            _trace: [],
            user_settings: {},
            guilds: guilds.map((guild) => new UnavailableGuild(guild)),
            private_channels: [],
            relationships: [],
            user: {
                verified: true,
                username: user.username,
                // ...
            }
        }, 'READY')

        guilds.forEach((guild) => {
            this.queue(15, this.createMessage(GatewayOpcode.Dispatch, guild, 'GUILD_CREATE'))
        })

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
