import * as WebSocket from 'ws'
import { createServer } from 'http'
// @ts-ignore
import { Constants } from 'discord.js'
import MessagePacker from './communication/MessagePacker'
import Message from './communication/Message'
import { parse } from 'querystring'
import { isWebsocketError } from './errors'
import { GatewayCloseEventCode, GatewayOpcode } from './constants'

export default class Gateway {

    start (wsPort: number | undefined = 5085, httpPort: number | undefined = 5056) : void {
        let wss = new WebSocket.Server({ port: wsPort })
        wss.on('connection', (socket, req) => {
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
                } catch (error) {
                    socket.close(isWebsocketError(error) ? error.code : GatewayCloseEventCode.UnknownError)
                }
            })
            
            // let id = req.headers['sec-websocket-key']
        })

        createServer((req, res) => {
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

}
