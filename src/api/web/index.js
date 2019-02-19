import WebSocket from 'ws'

export default class WebSocketServer {

    listen (port) {
        let wss = new WebSocket.Server({ port })
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                console.log(message)
            })
        })
    }

}
