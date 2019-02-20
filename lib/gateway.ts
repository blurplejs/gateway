import * as WebSocket from 'ws'
import { createServer, Server } from 'http'
// @ts-ignore
import { Constants } from 'discord.js'
import { parse } from 'querystring'
import { GatewayCloseEventCode } from './constants'
import ClientResponder from './communication/ClientResponder'
import { Encoding } from './communication/MessageEncoder'

export default class Gateway {

    wss: WebSocket.Server | undefined
    http: Server | undefined

    sockets = {} as { [key: string]: WebSocket }

    start (wsPort: number | undefined = 5085, httpPort: number | undefined = 5056) : void {
        this.wss = new WebSocket.Server({ port: wsPort })
        this.wss.on('connection', (socket, req) => {
            let attributes = parse((req.url as string).replace(/^\/?\??/, ''))

            let encodingString = attributes.encoding || 'json'
            let encoding = encodingString == 'json' ? Encoding.JSON : Encoding.ETF
            
            let clientResponder = new ClientResponder(socket, attributes, encoding)
            clientResponder.attachListener()
            clientResponder.sendHello()
            
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
