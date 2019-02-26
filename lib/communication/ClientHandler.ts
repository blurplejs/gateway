import * as WebSocket from 'ws'
import { encode, decode, Encoding } from './Encoder'
import { GatewayOpcode, GatewayCloseEventCode, VoiceOpcode } from '../constants'
import Message from './Message'
import { AuthenticationFailedError, isWebsocketError } from '../errors'
import storage from '../storage'
import { Guild, UnavailableGuild } from '../objects'
import EventType from '../events/EventType'
import { Ready } from '../events/Ready'
import { GuildCreate } from '../events/GuildCreate'
import { Hello } from '../events/Hello'

export default class ClientHandler {

    protected sequence = 0
    protected previousEvents: { [k: number]: EventType<any> } = {}

    constructor (
        protected socket: WebSocket,
        protected encoding: Encoding = Encoding.JSON
    ) { }

    attachListeners () : void {
        this.socket.on('message', async (buffer) => {
            try {
                let decodedPayload = decode(buffer, this.encoding)
                let message = Message.fromClientPacket(decodedPayload)

                let handler = ClientHandler.listenerMap[message.opcode as GatewayOpcode]
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

    protected send (message: Message | EventType<any>) : void {
        if (this.socket.readyState !== WebSocket.OPEN) return

        if (message instanceof EventType) {
            message = Message.fromEvent(message)
        }

        //console.log(encode(message, this.encoding))
        this.socket.send(encode(message, this.encoding))
    }

    protected createMessage (opcode: GatewayOpcode | VoiceOpcode, data?: any, eventName?: any) : Message {
        return new Message(opcode, data, eventName, this.sequence++)
    }

    protected attachStorageListeners () : void {
        storage.on('guildCreated', (guild: Guild) => this.send(new GuildCreate(guild)))
    }

    protected queue (delay: number, message: Message | EventType<any>) : this {
        setTimeout(() => this.send(message), delay)

        return this
    }

    sendHello () : void {
        this.send(new Hello())
    }

    protected static listenerMap : { [K in GatewayOpcode]?: keyof ClientHandler } = {
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
        
        // Authenticate the user via a user's pseudo @api_token property
        let user = storage.users.find((user) => user['@api_token'] == request.data.token)
        if (!user) throw new AuthenticationFailedError()

        // Search for guilds this user is a member of
        let guilds = storage.guilds
        let unavailable = guilds.map(guild => new UnavailableGuild(guild))

        // Generate a new response and queue GuildCreate events
        let response = new Ready(user, unavailable, 'session')
        guilds.forEach((guild) => this.queue(15, new GuildCreate(guild)))

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
