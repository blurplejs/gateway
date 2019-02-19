import { Constants } from 'discord.js'
import express from 'express'
import WebSocket from 'ws'

export default class FakeDiscordServer {

    constructor (apiPort = 5080, wsPort = 5081) {
        this.apiPort = apiPort
        this.wsPort = wsPort
    }
    
    overrideDefaults () {
        Constants.DefaultOptions.http.host = `http://localhost:${this.apiPort}`
    }

    _api () {
        return new Promise((resolve) => {
            let app = express()
    
            app.get('/api/v7/gateway', (req, res) => {
                res.json({ url: `ws://localhost:${this.wsPort}` })
            })
    
            app.listen(this.apiPort, () => {
                resolve()
            })
        })
    }

    _ws () {
        let wss = new WebSocket.Server({ port: this.wsPort })
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                console.log(message)
            })
        })
    }

    async start () {
        await this._api()
        this._ws()
    }

}
