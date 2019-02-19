import * as WebSocket from 'ws'
import { createServer, Server } from 'http'
// @ts-ignore
import { Constants } from 'discord.js'
import MessagePacker from './communication/MessagePacker'
import Message from './communication/Message'
import { parse } from 'querystring'
import { isWebsocketError } from './errors'
import { GatewayCloseEventCode, GatewayOpcode } from './constants'

export default class Gateway {

    wss: WebSocket.Server | undefined
    http: Server | undefined

    sockets = {} as { [key: string]: WebSocket }

    start (wsPort: number | undefined = 5085, httpPort: number | undefined = 5056) : void {
        this.wss = new WebSocket.Server({ port: wsPort })
        this.wss.on('connection', (socket, req) => {
            let attributes = parse((req.url as string).replace(/^\/?\??/, ''))

            let encoding = attributes.encoding || 'json'
            let packer = new MessagePacker(encoding == 'etf')

            // Send Hello package
            let message = new Message(GatewayOpcode.Hello, {
                heartbeat_interval: 45000,
                _trace: ['discord-fake-gateway-01']
            })
            socket.send(packer.pack(message))

            socket.on('message', (buffer) => {
                try {
                    let content = packer.unpack(buffer)
                    let message = Message.fromPacket(content)

                    let response: Message

                    switch (message.opcode) {
                        case GatewayOpcode.Identify:
                            response = new Message(GatewayOpcode.Dispatch, {
                                v: attributes.v || 6,
                                user_settings: {},
                                user: {
                                    verified: true,
                                    username: 'Faker',
                                    // ...
                                }
                            }, 'READY', 1)
                            socket.send(packer.pack(response))
                            break
                        case GatewayOpcode.Heartbeat:
                            response = new Message(GatewayOpcode.HeartbeatAck)
                            socket.send(packer.pack(response))
                            break
                    }
                } catch (error) {
                    socket.close(isWebsocketError(error) ? error.code : GatewayCloseEventCode.UnknownError)
                }
            })
            
            let id = req.headers['sec-websocket-key'] as string
            this.sockets[id] = socket
        })

        this.http = createServer((req, res) => {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-Powered-By': 'nodejs'
            })

            res.write(JSON.stringify({ url: `ws://localhost:${wsPort}` }))
            res.end()
        }).listen(httpPort)

        Constants.DefaultOptions.http.host = `http://localhost:${httpPort}`
    }

    stop () : void {
        if (this.wss) {
            for (let key of Object.keys(this.sockets)) {
                this.sockets[key].close(GatewayCloseEventCode.UnknownError)
            }

            this.wss.close()
        }

        if (this.http) {
            this.http.close()
        }
    }

}
