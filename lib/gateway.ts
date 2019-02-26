import * as WebSocket from 'ws'
import { createServer, Server } from 'https'
// @ts-ignore
import { Constants } from 'discord.js'
import { parse } from 'querystring'
import { GatewayCloseEventCode } from './constants'
import ClientHandler from './communication/ClientHandler'
import { Encoding } from './communication/Encoder'
import * as pem from 'pem'

export default class Gateway {

    wss: WebSocket.Server | undefined
    http: Server | undefined

    sockets = {} as { [key: string]: WebSocket }

    async start (wsPort: number | undefined = 5085, httpPort: number | undefined = 5056) {
        let keys = await this.createCertificate()

        this.wss = new WebSocket.Server({ port: wsPort })
        this.wss.on('connection', (socket, req) => {
            let attributes = parse((req.url as string).replace(/^\/?\??/, ''))
            let encoding = attributes.encoding === 'etf' ? Encoding.ETF : Encoding.JSON
            
            let handler = new ClientHandler(socket, encoding, attributes.compress as string)
            handler.attachListeners()
            handler.sendHello()
            
            let id = req.headers['sec-websocket-key'] as string
            this.sockets[id] = socket
        })

        this.http = createServer({ key: keys.serviceKey, cert: keys.certificate }, (req, res) => {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-Powered-By': 'nodejs'
            })

            res.write(JSON.stringify({ url: `ws://localhost:${wsPort}` }))
            res.end()
        }).listen(httpPort)

        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0"
        Constants.DefaultOptions.http.api = `https://localhost:${httpPort}`
    }

    createCertificate () : Promise<pem.CertificateCreationResult> {
        return new Promise((resolve, reject) => {
            pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
                if (err) return reject(err)

                resolve(keys)
            })
        })
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
